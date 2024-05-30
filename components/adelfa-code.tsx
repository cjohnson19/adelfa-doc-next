import { CodeBlock } from "./ui/code-block";

export type AdelfaCodeProps = {
  code: string;
};

type AdelfaCodeFileProps = {
  specification: string;
  development: string;
  interpret: boolean;
};

export function Adelfa({ code }: AdelfaCodeProps) {
  return <CodeBlock language="adelfa">{code}</CodeBlock>;
}

export function AdelfaSignature({ code }: AdelfaCodeProps) {
  return <CodeBlock language="adelfa-signature">{code}</CodeBlock>;
}
