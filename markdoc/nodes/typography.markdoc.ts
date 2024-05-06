import { H1, MarkdownHeader, P } from "@/components/ui/typography";

export const heading = {
  render: MarkdownHeader,
  attributes: {
    level: Number,
  },
}

export const paragraph = {
  render: P,
}