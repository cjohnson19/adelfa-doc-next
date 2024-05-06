/** @type {import('next').NextConfig} */
import withMarkdoc from "@markdoc/next.js";

const nextConfig = withMarkdoc({ mode: "static" })({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

export default nextConfig;
