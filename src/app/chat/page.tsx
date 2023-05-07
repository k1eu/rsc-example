import Image from "next/image";

import { supabase } from "../../db/supabase";
import AddMessage from "@/components/AddMessage";

export default async function Chat() {
  let { data } = await supabase.from("messages").select();

  return (
    <div>
      <h1>Messages</h1>
      <div>
        <h3>Enter your message</h3>
        {/* @ts-expect-error Server Component */}
        <AddMessage />
      </div>
      <ul>
        {data?.map((message) => (
          <li className="flex flex-row" key={message.id}>
            <div>{message.author}</div>
            <div>{message.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
