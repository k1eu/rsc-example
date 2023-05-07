"use client";
import { supabase } from "@/db/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const AddMessageMixed = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      const res = await supabase.from("messages").insert(data);
      return res;
    },
  });
  const router = useRouter();

  const client = useQueryClient();

  const ref = React.useRef(null);

  const onSubmit = async (options: {
    withRevalidate: boolean;
    withRevalidateServer: boolean;
  }) => {
    if (isLoading || !ref.current) return;

    // @ts-ignore
    const author = ref.current[0].value;
    // @ts-ignore
    const text = ref.current[1].value;

    if (!author || !text) {
      return;
    }

    await mutateAsync([{ author, text }], {
      onSuccess(data, variables, context) {
        if (options.withRevalidate) {
          client.invalidateQueries({
            queryKey: ["messages"],
          });
          return;
        }
        if (options.withRevalidateServer) {
          router.refresh();
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
        onClick={() =>
          onSubmit({ withRevalidate: true, withRevalidateServer: false })
        }
        disabled={isLoading}
      >
        submit with revalidate
      </button>
      <button
        className="bg-purple-500 text-white p-2 mt-2"
        id="cache"
        type="button"
        onClick={() =>
          onSubmit({ withRevalidate: false, withRevalidateServer: false })
        }
        disabled={isLoading}
      >
        submit with cache update
      </button>
      <button
        className="bg-purple-500 text-white p-2 mt-2"
        id="cache"
        type="button"
        onClick={() =>
          onSubmit({ withRevalidate: false, withRevalidateServer: true })
        }
        disabled={isLoading}
      >
        submit with server revalidate
      </button>
    </form>
  );
};

export default AddMessageMixed;
