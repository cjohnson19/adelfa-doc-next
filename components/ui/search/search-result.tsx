"use client";

import { useRouter } from "next/navigation";
import { CommandItem } from "../../command";
import {
  PagefindEntry,
  pagefindResultUrl,
  PagefindSubEntry,
} from "@/lib/search";
import React from "react";

export default function SearchResult({
  res,
  setOpened,
}: {
  res: PagefindSubEntry;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const visitResult = (res: PagefindEntry | PagefindSubEntry) => {
    router.push(pagefindResultUrl(res));
    setOpened(false);
  };

  const highlightMarks = (text: string) => {
    const div = document.createElement("div");
    div.innerHTML = text;
    div.querySelectorAll("mark").forEach((mark) => {
      mark.classList.add("font-bold", "text-primary", "bg-muted");
    });
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: div.innerHTML },
    });
  };

  return (
    <CommandItem
      key={res.url}
      onClick={() => visitResult(res)}
      onSelect={() => visitResult(res)}
    >
      <div className="flex flex-col justify-between">
        <p className="font-semibold">{res.title}</p>
        <p>{highlightMarks(res.excerpt ?? "")}</p>
      </div>
    </CommandItem>
  );
}
