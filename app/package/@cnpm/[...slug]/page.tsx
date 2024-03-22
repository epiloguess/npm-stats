import { lastMonthRange } from "@/_libs/func";

import NpmLineChart from "@/_component/NpmLineChart";
import PieChart from "@/_component/PieChart";

async function getCnpmData(range, pkg_name) {
  const res = await fetch(`https://registry.npmmirror.com/downloads/range/${range}/${pkg_name}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

function getCnpmMonthData(range, data, pkg_name) {
  const [range_start, range_end] = range.split(":");
  const range_start_index = data.findIndex((e) => e.day === range_start);
  const range_end_index = data.findIndex((e) => e.day === range_end);
  const ranged_downloads = data.slice(range_start_index, range_end_index + 1);
  return {
    start: range_start,
    end: range_end,
    package: pkg_name,
    downloads: ranged_downloads,
  };
}

function getMajorList(data) {
  const newSet = new Set();
  for (const key of Object.keys(data)) {
    newSet.add(parseInt(key.split(".")[0]));
  }
  return [...newSet];
}

function getCnpmWeekData(data, pkg_name) {
  const major_list = getMajorList(data);
  const entried_data = Object.entries(data);

  const pie_data = major_list
    .map((major) => {
      const result = entried_data
        .filter(([version]) => version.startsWith(`${major}.`))
        .reduce((acc, [, downloads]) => {
          const alldownloads = downloads.reduce((acc, { downloads }) => (acc += downloads), 0);
          acc += alldownloads;
          return acc;
        }, 0);
      return { version: `${pkg_name} ${major}`, count: result };
    })
    .sort((a, b) => b.count - a.count);

  return pie_data;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const undecodedString = params.slug.join("/");
  const pkg_name = decodeURIComponent(undecodedString);
  //

  const cnpm_data = await getCnpmData(lastMonthRange, pkg_name);
  const cnpm_month_data = getCnpmMonthData(lastMonthRange, cnpm_data.downloads, pkg_name);

  const cnpm_week_data = getCnpmWeekData(cnpm_data.versions, pkg_name);

  return (
    <div className="flex flex-col gap-2">
      <h3 className=" m-auto bg-slate-100 border-2 px-2 rounded mt-4">CNPM</h3>

      <div className="flex gap-2"></div>

      <div className="h-[300px]">
        <NpmLineChart data={cnpm_month_data}></NpmLineChart>
      </div>

      <div
        className={
          cnpm_week_data.length < 10
            ? "h-[300px]"
            : cnpm_week_data.length < 15
            ? "h-[400px]"
            : cnpm_week_data.length < 20
            ? "h-[500px]"
            : cnpm_week_data.length < 30
            ? "h-[600px] md:h-[600px]"
            : ` h-[600px] md:h-[600px]`
        }
      >
        {" "}
        <PieChart data={cnpm_week_data}></PieChart>
      </div>
    </div>
  );
}
// export async function generateStaticParams() {
//   const arr = projects_data.map((project) => {
//     const project_name = project.name?.split("/");
//     return { slug: project_name };
//   });
//   return arr;
// }
