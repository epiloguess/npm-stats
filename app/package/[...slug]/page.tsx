// import { getPkgTag } from "../../../utils/server";
import { getPkgMeta } from "@utils/server";
import { Suspense } from "react";
import Npm from "./Npm";

import MultiPkgChart from "@componets/MultiPkgChart";
import { PkgMeta } from "@componets/PkgMeta";
export const runtime = "edge";

async function PKgMetaWrap({ pkg }: { pkg: string }) {
  let meta = await getPkgMeta(pkg);
  return <PkgMeta meta={meta}></PkgMeta>;
}
export default async function Page({ params }: { params: { slug: string[] } }) {
  const undecodedString = params.slug.join("/");
  const pkg = decodeURIComponent(undecodedString);

  return (
    <div className='flex flex-col gap-2'>
      <section className='flex flex-col gap-2'>
        <Suspense fallback={<div className=' h-[60px]'>Loading ...</div>}>
          <PKgMetaWrap pkg={pkg}></PKgMetaWrap>
        </Suspense>
      </section>
      <Suspense
        fallback={<div className=' m-auto w-fit h-[300px]'>Loading ...</div>}>
        <div className=' h-[300px]'>
          <MultiPkgChart pkg_list={[pkg]}></MultiPkgChart>
        </div>
      </Suspense>

      <section>
        <div className='md:flex gap-2'>
          <div className='md:w-1/2'>
            <Suspense fallback={<div className='text-center'>Loading ...</div>}>
              <Npm source='cnpm' pkg={pkg}></Npm>
            </Suspense>
          </div>
          <div className='md:w-1/2 '>
            <Suspense
              fallback={<div className=' text-center'>Loading ...</div>}>
              <Npm source='npm' pkg={pkg}></Npm>
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const undecodedString = params.slug.join("/");
  const pkg = decodeURIComponent(undecodedString);

  return {
    title: `${pkg} | npmstats`,
  };
}
