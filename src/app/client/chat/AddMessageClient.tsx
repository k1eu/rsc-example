"use client";
import { supabase } from "@/db/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const AddMessageClient = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      const res = await supabase.from("messages").insert(data);
      return res;
    },
  });

  const client = useQueryClient();

  const ref = React.useRef(null);

  const onSubmit = async (withRevalidate: boolean) => {
    if (isLoading || !ref.current) return;

    // @ts-ignore
    const author = ref.current[0].value;
    // @ts-ignore
    const text = ref.current[1].value;

    console.log({ text, author });

    if (!author || !text) {
      return;
    }

    await mutateAsync([{ author, text }], {
      onSuccess(data, variables, context) {
        if (withRevalidate) {
          client.invalidateQueries({
            queryKey: ["messages"],
          });
          return;
        }
        client.setQueryData(["messages"], (old: any) => [
          ...old,
          {
            id: "somerandom",
            author,
            text,
          },
        ]);
      },
    });
  };

  return (
    <form className="text-black block" ref={ref}>
      <input
        className="p-2 rounded-sm block w-full"
        type="text"
        name="name"
        placeholder="Your name"
      />
      <textarea
        className="p-2 rounded-sm block resize-none mt-2 w-full"
        name="text"
        placeholder="Type a message..."
      />
      <button
        className="bg-purple-500 text-white p-2 mt-2"
        id="rev"
        type="button"
        onClick={() => onSubmit(true)}
        disabled={isLoading}
      >
        submit with revalidate
      </button>
      <button
        className="bg-purple-500 text-white p-2 mt-2"
        id="cache"
        type="button"
        onClick={() => onSubmit(false)}
        disabled={isLoading}
      >
        submit with cache update
      </button>
    </form>
  );
};

export default AddMessageClient;
