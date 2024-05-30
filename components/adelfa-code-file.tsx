import { readFile } from "fs/promises";

type Direct = string;
type FromFile = {
  name: string;
  path: string;
};
type ReadResult = {
  name: string;
  content: string;
};

export type AdelfaCodeFileProps = {
  specification: Direct | FromFile;
  development: Direct | FromFile;
  interpret: boolean;
};

async function readIn(p: Direct | FromFile): Promise<ReadResult> {
  if (typeof p === "string") {
    return {
      name: "string",
      content: p,
    };
  } else {
    return {
      name: p.name,
      content: await readFile(p.path, "utf-8"),
    };
  }
}

export async function AdelfaCodeFile({
  specification,
  development,
  interpret,
}: AdelfaCodeFileProps) {
  throw Error("todo");

  return (
    <div>
      <h1>AdelfaCodeFile</h1>
    </div>
  );
}
