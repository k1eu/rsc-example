import { supabase } from "@/db/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await supabase.from("messages").delete().neq("author", "k1eu");
  return NextResponse.json({ res });
}
