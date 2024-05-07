"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../../command";
import SearchResult from "./search-result";
import {
  filterErrors,
  flattenEntries,
  PagefindEntry,
  PagefindSubEntry,
  resultToEntries,
} from "@/lib/search";
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
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<PagefindSubEntry[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function handleSearch() {
    if (window.pagefind) {
      window.pagefind.preload(search);
      const res = await window.pagefind.debouncedSearch(search);
      if (!res) return;
      setLoading(true);
      const entries = await resultToEntries(res.results);
      const results = filterErrors(flattenEntries(entries));
      setResults(results);
      setLoading(false);
    } else {
      setError("Search is not available.");
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
        {error || <CommandEmpty>No results found.</CommandEmpty>}
        {error && <CommandEmpty>{error}</CommandEmpty>}
        {loading && <CommandEmpty>Loading...</CommandEmpty>}
        {!loading &&
          results.map((result) => (
            <>
              <SearchResult key={result.url} res={result} setOpened={setOpen} />
              <CommandSeparator />
            </>
          ))}
      </CommandList>
    </CommandDialog>
  );
}
