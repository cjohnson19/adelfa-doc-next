import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
  interface Array<T> {
    max(): T | undefined;
    unique_by(key: string): T[];
  }
}

Array.prototype.max = function () {
  return Math.max(...this);
};

Array.prototype.unique_by = function (key: string) {
  return this.filter((x, i, a) => a.map((o) => o[key]).indexOf(x[key]) === i);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
