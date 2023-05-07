import Disclaimer from "@/components/Disclaimer";
import MixedClientChat from "./ClientChat";
import { supabase } from "@/db/supabase";

export default async function Chat() {
  let { data } = await supabase.from("messages").select();

  return (
    <>
      <Disclaimer>
        This page fetches data on the client and updates it too
      </Disclaimer>
      {/*@ts-ignore*/}
      <MixedClientChat messages={data} key={Math.random()} />
    </>
  );
}
