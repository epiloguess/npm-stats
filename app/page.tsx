import React from "react";
import SearchFromNpm from '@/_component/SearchFromNpm'
import Link from "next/link";


import {TAGS} from '@/_libs/func'
// import {TAGS} from '@/_libs/func'

// import NpmStatisticsSVG from '@/NpmStatisticsSVG'



export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {/* <NpmStatisticsSVG  ></NpmStatisticsSVG> */}
      {/* <SearchFromNpm></SearchFromNpm> */}
      <div className="md:grid mb-2   md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TAGS.map((tag) => {

          if (tag.projects.length > 5 ){
          return <div className="   " key={tag.tag}>
            <a href={`/tags/${tag.tag}`} className=" hover:underline font-bold">
              {tag.tag}
            </a>
            <ul className=" flex flex-wrap gap-1 ">
              {tag.projects.slice(0, 5).map((pkg) => (
                <li key={pkg}>
                  <a
                    className="text-[#0074d9] hover:underline"
                    href={`/package/${pkg}`}
                  >
                    {pkg},
                  </a>
                </li>
              ))}
              {tag.projects.length > 5 && (
                <li>
                  and{" "}
                  <a
                    className="text-blue-500 hover:underline"
                    href={`/tags/${tag.tag}`}
                  >
                    {tag.projects.length - 5 } more
                  </a>{" "}
                </li>
              )}
            </ul>
          </div>}
})}
      </div>
    </main>
  );
}
