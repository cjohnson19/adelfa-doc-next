interface PageLink {
  href: string;
  label: string;
}

export abstract class Constants {
  static readonly links: PageLink[] = [
    { href: "/", label: "Home" },
    { href: "/download", label: "Download" },
    { href: "/reference-guide", label: "Reference Guide" },
    { href: "/examples", label: "Examples" },
    { href: "/walkthrough", label: "Walkthrough" },
  ];

  static readonly githubLink = "https://github.com/adelfa-prover/adelfa";
}
