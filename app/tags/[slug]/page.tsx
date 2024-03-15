import MultiPkgChart from "../../_component/MultiPkgChart";
import { getTag, TAGS, PKG_META, getPkgMeta, getPkgTag } from "@/_libs/func";
export default async function App({ params }) {
  const tag_name = decodeURIComponent(decodeURIComponent(params.slug));
  let tag_data;
  try {
    tag_data = await getTag(tag_name);
  } catch (err) {
    console.error("/tags/[slug],tag_data", err);
  }

  return (
    <div className=" flex  flex-col justify-center gap-2">

      {tag_data.projects.map((project) => (
          <div
            key={project}
            className=" border px-2 py-1 rounded flex flex-col gap-2"
          >
            <div className="md:flex justify-between gap-2 items-center">
              <div className="py-1">
              <a href={`/package/${project}`} className=" text-orange-400  font-bold">
                {project}
              </a>
              </div>
       
              <div className="flex gap-2 flex-wrap">
                {getPkgTag(project).map((e) => (
                  <a
                    className=" bg-gray-300 hover:bg-gray-400 rounded px-2 "
                    href={`/tags/${e}`}
                    key={e}
                  >
                    {e}
                  </a>
                ))}
              </div>
            </div>

            <p>{getPkgMeta(project)?.description}</p>
          </div>
        ))}
  
      <div
        className={
          tag_data?.projects.length < 10
            ? "h-[400px]"
            : tag_data.projects.length < 15
            ? "h-[500px]"
            : tag_data.projects.length < 20
            ? "h-[600px]"
            : "h-[1200px]"
        }
      >
        <MultiPkgChart data={tag_data.chartData}></MultiPkgChart>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const arr = TAGS.map((tag) => {
    const encode_url = encodeURIComponent(tag.tag);
    return { slug: encode_url };
  });

  return arr;
}
