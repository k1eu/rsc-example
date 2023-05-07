"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function DynamicLink({
  className,
  href,
  children,
}: PropsWithChildren<{ className: string; href: string }>) {
  const router = useRouter();

  return (
    <a
      className={className}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
        router.refresh();
      }}
    >
      {children}
    </a>
  );
}
