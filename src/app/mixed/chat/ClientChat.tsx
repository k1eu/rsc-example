"use client";

import { supabase } from "@/db/supabase";
import { useQuery } from "@tanstack/react-query";
import AddMessageMixed from "./AddMessageMixed";

const MixedClientChat = ({
  messages,
}: {
  messages: {
    id: string;
    author: string;
    text: string;
  }[];
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = (await supabase.from("messages").select()) as {
        data: {
          id: string;
          author: string;
          text: string;
        }[];
      };
      return data || [];
    },
    initialData: messages,
  });

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="flex gap-2">
      <div className="w-96">
        <h1 className="text-xl">RSC Chat using server prepopulation to client</h1>
        <div>
          <h3>Enter your name & message</h3>
          <AddMessageMixed />
        </div>
      </div>
      <ul className="mt-4">
        {data.map((message) => (
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
  );
};
export default MixedClientChat;
