import { getPkgTag, PKG_META } from "../../_libs/func";
import PkgMajorDetail from "@/_component/PkgMajorDetail";
import MainVersionChart from "@/_component/MainVersionChart";
import projects_data from "@/_data/pkg_meta.json";
import { getPkgData } from "@/_libs/func";

import PieChart from "@/_component/PieChart";

function getMajorList(remoteData) {
  const newSet = new Set();
  for (const key of Object.keys(remoteData.downloads)) {
    newSet.add(parseInt(key.split(".")[0]));
  }
  return [...newSet];
}

async function getNpmData() {
  const res = await fetch("https://api.npmjs.org/versions/react/last-week");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const undecodedString = params.slug.join("/");
  const pkg_name = decodeURIComponent(undecodedString);
  //

  const npm_data = await getNpmData();
  const major_list = getMajorList(npm_data);
  const entries_data = Object.entries(npm_data.downloads);

  const aa = major_list
    .map((major) => {
      const result = entries_data
        .filter(([key]) => key.startsWith(`${major}.`))
        .reduce((acc, [, value]) => (acc += value), 0);
      return { version: major, count: result };
    })
    .sort((a, b) => b.count - a.count);
  //
  let tags = getPkgTag(pkg_name);
  let pkg_data;
  try {
    pkg_data = await getPkgData(pkg_name);
  } catch (err) {
    return console.error("获取pkg_data失败", err);
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="py-2">
        <a
          className=" text-orange-500 text-2xl font-bold "
          href={`https://www.npmjs.com/package/${pkg_name}`}
        >
          {pkg_name}
        </a>
      </div>

      <div className="flex gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className=" bg-gray-300 hover:bg-gray-400  px-2 rounded"
          >
            <p>
              <a href={`/tags/${tag}`}>{tag}</a>
            </p>
          </div>
        ))}
      </div>
      <div> {pkg_data.pkg_data.description}</div>
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
