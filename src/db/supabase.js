import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://huohzhjapdcprphajtss.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1b2h6aGphcGRjcHJwaGFqdHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM0NjkyMzUsImV4cCI6MTk5OTA0NTIzNX0.BAeZ53BfwXFr3QUaYGHtc_yuHdkC8pJUoCYVpk97gE4",
  {
    global: {
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          cache: "no-store",
          next: {
            revalidate: 0,
          },
        }),
    },
  }
);
