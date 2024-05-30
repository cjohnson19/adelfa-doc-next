import GithubSlugger from "github-slugger";
import path from "path";

interface PageLink {
  href: string;
  label: string;
}

interface Examples {
  [key: string]: Example[];
}

interface Example {
  name: string;
  path: string;
}

interface ExampleListing {
  webPath: string[];
  name: string;
  path: string;
}

const slugger = new GithubSlugger();

export abstract class Constants {
  static readonly links: PageLink[] = [
    { href: "/reference-guide", label: "Reference Guide" },
    { href: "/download", label: "Download" },
    { href: "/examples", label: "Examples" },
    { href: "/walkthrough", label: "Walkthrough" },
  ];

  static readonly examples: Examples = {
    "First Order": [{ name: "Properties of append", path: "append" }],
    // "Lambda Calculus": [
    //   {
    //     name: "Subject Reduction for the simply typed lambda calculus",
    //     path: "stlc",
    //   },
    // ],
  };

  static readonly examplesFlat: { [key: string]: ExampleListing } =
    Object.fromEntries(
      Object.entries(Constants.examples)
        .map(([k, vs]) => {
          const slug = slugger.slug(k);
          return vs.map((v) => [
            path.join(slug, v.path),
            { webPath: [slug, v.path], ...v },
          ]);
        })
        .flat(),
    );

  static readonly githubLink = "https://github.com/adelfa-prover/adelfa";
}
