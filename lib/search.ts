declare global {
  interface Window {
    pagefind: {
      debouncedSearch: (query: string) => Promise<{ results: any[] }>;
      options: (x: Record<string, unknown>) => void;
      preload: (query: string) => void;
    };
  }
}

interface PagefindResultSuspense {
  id: string;
  data: () => Promise<Omit<PagefindEntry, "id">>;
}

interface PagefindEntry {
  id: string;
  url: string;
  content: string;
  word_count: number;
  filters: Record<string, unknown>;
  meta: MetaData;
  anchors: Anchor[];
  weighted_locations: WeightedLocation[];
  locations: number[];
  raw_content: string;
  raw_url: string;
  excerpt: string;
  sub_results: PagefindSubEntry[];
}

interface MetaData {
  title: string;
}

interface Anchor {
  element: string;
  id: string;
  text: string;
  location: number;
}

interface WeightedLocation {
  weight: number;
  balanced_score: number;
  location: number;
}

interface PagefindSubEntry {
  title: string;
  url: string;
  weighted_locations: WeightedLocation[];
  locations?: number[];
  excerpt?: string;
}

function pagefindResultUrl(res: PagefindEntry | PagefindSubEntry) {
  const path = res.url.match(/\/([^/]+)\.html(#.*)?$/);
  if (!path) {
    console.log(path);
    return "/";
  }
  let basePath = path.length > 1 ? path[1] : "";
  const anchor = path.length > 2 ? path[2] : "";
  if (!basePath) {
    basePath = "/";
  }
  console.log(basePath);
  return basePath + (anchor ?? "");
}

async function resultToEntries(
  res: PagefindResultSuspense[],
  limit: number = 3,
): Promise<PagefindEntry[]> {
  return await Promise.all(
    res.slice(0, 5).map(async (entry) => {
      const data = await entry.data();
      return {
        id: entry.id,
        ...data,
      };
    }),
  );
}

function flattenEntries(entries: PagefindEntry[]): PagefindSubEntry[] {
  return entries
    .flatMap((entry) => entry.sub_results)
    .unique_by((x) => x.title);
}

function filterErrors(entries: PagefindSubEntry[]) {
  return entries.filter(
    (entry) => !(entry.title.includes("404") || entry.title.includes("500")),
  );
}

export { pagefindResultUrl, resultToEntries, flattenEntries, filterErrors };
export type {
  PagefindResultSuspense,
  PagefindEntry,
  MetaData,
  Anchor,
  WeightedLocation,
  PagefindSubEntry,
};
