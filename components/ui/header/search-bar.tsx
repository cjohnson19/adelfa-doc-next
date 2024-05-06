'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import CommandMenu from "../command-menu";

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <form>
      <CommandMenu open={open} setOpen={setOpen} />
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
