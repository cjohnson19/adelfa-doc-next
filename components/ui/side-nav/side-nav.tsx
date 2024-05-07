"use client";

import NavLinks from "./nav-links";
import HomeButton from "./home-button";

export default function SideNav() {
  return (
    <div className="flex md:w-[220px] lg:w-[280px] fixed h-full bg-muted/40 border-r max-h-screen flex-col gap-2">
      <HomeButton />
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavLinks />
        </nav>
      </div>
    </div>
  );
}
