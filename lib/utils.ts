import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
  interface Array<T> {
    max(): T | undefined;
  }
}

Array.prototype.max = function () {
  return Math.max(...this);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
