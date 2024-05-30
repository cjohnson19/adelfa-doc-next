import path from "path";
import { promises as fs } from "fs";
import { Constants } from "@/app/constants";
import { H2, MarkdownLink, UnorderedList } from "./ui/typography";
import GithubSlugger from "github-slugger";

async function ExampleListings({ directory }: { directory: string }) {
  const slugger = new GithubSlugger();
  return Object.entries(Constants.examples).map(([category, examples]) => (
    <>
      <H2>{category}</H2>
      <UnorderedList>
        {examples.map((example) => (
          <li key={example.name}>
            <MarkdownLink href={path.join(directory, slugger.slug(category), example.path)}>
              {example.name}
            </MarkdownLink>
          </li>
        ))}
      </UnorderedList>
    </>
  ));
}

export default ExampleListings;
