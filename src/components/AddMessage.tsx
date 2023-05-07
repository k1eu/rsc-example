import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";

const create = async (e: FormData) => {
  "use server";

  const author = e.get("name");
  const text = e.get("text");

  if (!author || !text) {
    return;
  }

  const a = await supabase
    .from("messages")
    .insert([{ author: e.get("name"), text: e.get("text") }]);

  revalidatePath("/server/chat");
};

const AddMessage = async () => {
  return (
    <form className="text-black block" action={create}>
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
      <button className="bg-purple-500 text-white p-2 mt-2">submit</button>
    </form>
  );
};

export default AddMessage;
