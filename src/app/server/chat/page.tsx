import { supabase } from "@/db/supabase";
import AddMessage from "@/components/AddMessage";
import Disclaimer from "@/components/Disclaimer";

export default async function Chat() {
  let { data } = await supabase.from("messages").select();

  return (
    <>
    <Disclaimer>This page is server rendered on request</Disclaimer>
      <div className="flex gap-2">
        <div className="w-96">
          <h1 className="text-xl">RSC Chat using only server actions</h1>
          <div>
            <h3>Enter your name & message</h3>
            {/* @ts-expect-error Server Component */}
            <AddMessage />
          </div>
        </div>
        <ul className="mt-4">
          {data?.map((message) => (
            <li className="" key={message.id}>
              <div className="flex gap-1 items-center">
                <div className="h-8 w-8 bg-slate-400 rounded-full"></div>
                <span className="truncate w-40">{message.author}</span>
              </div>
              <div>{message.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
