"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isBrowser = typeof window !== "undefined";

  function scrollUp() {
    if (!isBrowser) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  });

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 right-0 bg-transparent px-4 py-2 flex items-center",
          { hidden: !isVisible },
        )}
        onClick={scrollUp}
      >
        <Button size="icon" variant="outline">
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
export default ScrollToTop;
