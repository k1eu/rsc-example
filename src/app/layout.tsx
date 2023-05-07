import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS RSC vs SPA with supabase",
  description: "React server components test with supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-slate-900 flex min-h-screen items-center justify-center text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
