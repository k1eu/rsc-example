import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";

const create = async (e: FormData) => {
  "use server";

  const author = e.get('name');
  const text = e.get('text');

  if (!author || !text) {
    return;
  }

  const a = await supabase.from('messages').insert([
    { author: e.get('name'), text: e.get('text') },
  ])

  console.log({a})

  
  revalidatePath('/chat');
}

const AddMessage = async () => {

  return (
    <form className="text-black" action={create}>
      <input type="text" name='name' placeholder="Your name" />
      <input type="text" name='text' placeholder="Type a message..." />
      <button className="bg-red-500">submit</button>
    </form>
  )
}

export default AddMessage
