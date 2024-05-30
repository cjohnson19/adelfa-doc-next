import { H1, H2 } from "@/components/ui/typography";
import path from "path";
import { Constants } from "@/app/constants";
import { Adelfa, AdelfaSignature } from "@/components/adelfa-code";
import { promises as fs } from "fs";

export default async function Page({ params }: { params: { id: string[] } }) {
  const examplePath = path.join(...params.id);
  const exampleEntry = Constants.examplesFlat[examplePath];
  const exampleDir = path.join(process.cwd(), "public/examples", examplePath);
  const fileName = params.id.pop();
  const specSource = await fs.readFile(
    path.join(exampleDir, `${fileName}.lf`),
    "utf-8",
  );
  const devSource = await fs.readFile(
    path.join(exampleDir, `${fileName}.ath`),
    "utf-8",
  );
  if (!process.env["API_URL"]) {
    throw new Error("API_URL is not set");
  }
  const results = await fetch(process.env["API_URL"], {
    method: "POST",
    body: JSON.stringify({
      signature: {
        name: exampleEntry.name,
        content: specSource,
      },
      development: {
        content: devSource,
      },
      options: {
        annotate: true,
      },
    }),
  });
  if(!results.ok) {
    throw new Error(`Failed to fetch results: ${results.statusText}`);
  }
  const output = await results.text();
  return (
    <>
      <H1>{exampleEntry.name}</H1>
      <H2>Specification</H2>
      <AdelfaSignature code={specSource} />
      <H2>Reasoning</H2>
      <Adelfa code={devSource} />
      <H2>Results</H2>
      <div dangerouslySetInnerHTML={{ __html: output }} />
    </>
  );
}

// Let Next.js know that these are really static files
export async function generateStaticParams() {
  return Object.values(Constants.examplesFlat).map((example) => ({
    id: example.webPath,
  }));
}
