import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
  interface Array<T> {
    max(): T | undefined;
    unique_on(f: (x: T, y: T) => boolean): T[];
    unique_by(f: (x: T) => string): T[];
  }
}

Array.prototype.max = function <T>(): T | undefined {
  if (this.length === 0) {
    return undefined;
  }
  return this.reduce((max, item) => (item > max ? item : max), this[0]);
};

Array.prototype.unique_on = function <T>(f: (x: T, y: T) => boolean): T[] {
  const arr = [];
  if (this.length > 0) {
    arr.push(this[0]);
  }
  for (let i = 1; i < this.length; i++) {
    if (!arr.some((x) => f(x, this[i]))) {
      arr.push(this[i]);
    }
  }
  return arr;
};

Array.prototype.unique_by = function <T>(f: (x: T) => string): T[] {
  const seen = new Set<string>();

  return this.filter((item) => {
    const key = f(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
