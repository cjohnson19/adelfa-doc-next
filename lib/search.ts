declare global {
  interface Window {
    pagefind: {
      debouncedSearch: (query: string) => Promise<{ results: any[] }>;
      options: (x: Record<string, unknown>) => void;
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
    return "";
  }
  const basePath = path.length > 1 ? path[1] : "";
  const anchor = path.length > 2 ? path[2] : "";
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
    .flatMap((entry) => entry.sub_results);
    // .sort(
    //   (a, b) =>
    //     (b.weighted_locations?.map((x) => x.balanced_score).max() ?? 0) -
    //     (a.weighted_locations?.map((x) => x.balanced_score).max() ?? 0),
    // );
}

export { pagefindResultUrl, resultToEntries, flattenEntries };
export type {
  PagefindResultSuspense,
  PagefindEntry,
  MetaData,
  Anchor,
  WeightedLocation,
  PagefindSubEntry,
};
