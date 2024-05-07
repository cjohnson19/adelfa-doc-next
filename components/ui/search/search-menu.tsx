"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../../command";
import SearchResult from "./search-result";
import { flattenEntries, PagefindEntry, resultToEntries } from "@/lib/search";
import { Separator } from "@radix-ui/react-separator";
import { CommandSeparator } from "cmdk";

export default function SearchMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<PagefindEntry[]>([]);

  async function handleSearch() {
    if (window.pagefind) {
      const res = (await window.pagefind.debouncedSearch(search)) ?? {
        results: [],
      };
      const entries = await resultToEntries(res.results);
      console.log(entries);
      setResults(entries);
    } else {
      console.error("pagefind is not loaded");
    }
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open: boolean) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        value={search}
        onInput={handleSearch}
        onValueChange={setSearch}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {flattenEntries(results).map((result) => (
          <>
            <SearchResult key={result.url} res={result} setOpened={setOpen} />
            <CommandSeparator />
          </>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
