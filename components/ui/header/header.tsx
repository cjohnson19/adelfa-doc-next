import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Menu, Github } from "lucide-react";
import AdelfaLogo from "../adelfa-logo";
import Link from "next/link";
import SheetLinks from "./sheet-links";
import { ModeToggle } from "./mode-toggle";
import { Constants } from "@/app/constants";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <header className="flex fixed z-50 w-full h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-4 text-lg font-semibold"
            >
              <AdelfaLogo className="h-6 w-6" />
              <span className="sr-only">Adelfa</span>
            </Link>
            <SheetLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <Link href={Constants.githubLink} target="_blank">
        <Github className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">View on Github</span>
      </Link>
      <ModeToggle />
      <div className="flex-1">
        <SearchBar />
      </div>
    </header>
  );
}
