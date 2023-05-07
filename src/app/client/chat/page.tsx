import Disclaimer from "@/components/Disclaimer";
import ClientChat from "./ClientChat";

export default async function Chat() {
  return (
    <>
      <Disclaimer>
        This page fetches data on the client and updates it too
      </Disclaimer>
      <ClientChat />
    </>
  );
}
