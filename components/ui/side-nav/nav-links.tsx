"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Constants } from "@/app/constants";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {Constants.links.map((link) => {
        return (
          <Link
            key={link.label}
            href={link.href}
            className={clsx(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              { "bg-muted text-primary": pathname === link.href },
            )}
          >
            <p>{link.label}</p>
          </Link>
        );
      })}
    </>
  );
}
