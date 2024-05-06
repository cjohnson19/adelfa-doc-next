"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Constants } from "@/app/constants";

export default function SheetLinks() {
  const pathname = usePathname();
  return (
    <>
      {Constants.links.map((link) => {
        return (
          <Link
            key={link.label}
            href={link.href}
            className={clsx(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
              { "bg-muted text-foreground": pathname === link.href },
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
