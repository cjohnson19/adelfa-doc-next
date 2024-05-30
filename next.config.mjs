import nextMdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSlug],
  },
});

const nextConfig = withMdx({
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
});

export default nextConfig;
