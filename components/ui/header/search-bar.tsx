"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import SearchMenu from "../search/search-menu";

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === "undefined") {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind.js generated after build
            /* webpackIgnore: true */ "./pagefind/pagefind.js"
          );
          window.pagefind.options({
            excerptLength: 15,
          });
        } catch (e) {
          window.pagefind = {
            debouncedSearch: async (a: string) => ({ results: [] }),
            options: (x: Record<string, unknown>) => {},
            preload: (a: string) => {},
          };
        }
      }
    }
    loadPagefind();
  });

  return (
    <form>
      <SearchMenu open={open} setOpen={setOpen} />
      <div className="relative w-full md:w-2/3 lg:w-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full appearance-none bg-background pl-8 shadow-none"
          onClick={() => setOpen(true)}
        />
        <p className="text-sm text-muted-foreground absolute right-2.5 top-2.5">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </div>
    </form>
  );
}
