import Disclaimer from "@/components/Disclaimer";
import DynamicLink from "@/components/DynamicLink";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-slate-300 p-4 rounded-md text-slate-950">
        <h1 className="text-xl">NextJS RSC - Full SPA vs Server vs Mixed</h1>
        <div className="flex gap-2 justify-center mt-2">
          <Link
            className="bg-purple-500 p-2 rounded-md text-white"
            href="/client/chat"
          >
            {" "}
            Full Client
          </Link>
          <DynamicLink
            className="bg-purple-500 p-2 rounded-md text-white"
            href={"/server/chat"}
          >
            {" "}
            Full Server
          </DynamicLink>
          <Link
            className="bg-purple-500 p-2 rounded-md text-white"
            href={"/mixed/chat"}
          >
            {" "}
            Mixed
          </Link>
        </div>
      </section>
      <Disclaimer>This page is staticaly generated at buildtime</Disclaimer>
    </>
  );
}
