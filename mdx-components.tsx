import { MDXComponents } from "mdx/types";
import {
  H1,
  H2,
  H3,
  InlineCode,
  MarkdownLink,
  OrderedList,
  P,
  Table,
  Td,
  Th,
  Tr,
  UnorderedList,
} from "@/components/ui/typography";
import Image, { ImageProps } from "next/image";
import { CodeBlock } from "./components/ui/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <H1 {...props} />,
    h2: (props) => <H2 {...props} />,
    h3: (props) => <H3 {...props} />,
    // eslint-disable-next-line jsx-a11y/alt-text
    img: (props) => <Image {...(props as ImageProps)} />,
    a: (props) => <MarkdownLink {...props} />,
    td: (props) => <Td {...props} />,
    th: (props) => <Th {...props} />,
    tr: (props) => <Tr {...props} />,
    table: (props) => <Table {...props} />,
    ul: (props) => <UnorderedList {...props} />,
    ol: (props) => <OrderedList {...props} />,
    code: (props) => <InlineCode {...props} />,
    p: (props) => <P {...props} />,
    ...components,
  };
}
