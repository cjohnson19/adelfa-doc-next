import { CodeBlock } from "@/components/ui/code-block";
import { nodes } from "@markdoc/markdoc";

export const fence = {
  render: CodeBlock,
  attributes: nodes.fence.attributes,
}