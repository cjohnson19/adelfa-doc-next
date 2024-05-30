"use client";

import { Check, Copy } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-lisp.min";
import "prism-theme-night-owl";

Prism.languages["adelfa-signature"] = {
  keyword: /\b(?:type)\b/,
  operator: /\./,
  function: /[{}:[\]]/,
};

Prism.languages.adelfa = {
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  boolean: /\b(?:false|true)\b/,
  variable: [{ pattern: /\b(?:H[1-9]+[0-9]*|IH[0-9]*)\b/ }],
  "class-name": [
    {
      pattern: /(\b(?:Theorem|Schema|apply|Subgoal)\s+)[\w|\-|.]+/,
      lookbehind: true,
    },
    /[\w|-|.0-9]+(?=\s*>>)/,
  ],
  operator: />>/,
  keyword: {
    pattern: /\b(?:Theorem|Specification|Set|Schema|Subgoal|Vars)\b/,
  },
  function: [
    /\b(?:apply|forall|exists|case|inst|induction|intros|keep|left|right|search|split|on|to|with|assert)\b/,
    /(?:\\\/|\/\\|=>|,|:|=)/,
  ],
  number: /\b(?:[1-9]+[0-9]*)\b/,
  important: /\b(?:skip)\b|\./,
  comment: {
    pattern: /\s*%.*/,
    greedy: true,
  },
  symbol: /[{}[\]]/,
};

import * as React from "react";
import { Button } from "./button";
import copy from "copy-to-clipboard";

export function CodeBlock({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  const childTrimmed = children.trim();
  const ref = React.useRef<any>(null);
  const [copied, setCopied] = React.useState(false);

  function copyCode() {
    setCopied(true);
    copy(ref.current.innerText.trim());
    setTimeout(() => setCopied(false), 2000);
  }

  React.useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false);
  }, [childTrimmed]);

  if (!language) language = "adelfa";

  return (
    <div className="code" aria-live="polite">
      <pre ref={ref} className={`language-${language}`}>
        {childTrimmed}
      </pre>
      <div className="absolute top-4 right-2 bg-transparent text-sm p-0 m-0">
        <Button
          size="icon"
          aria-label="Copy code"
          className="p-0 m-0 h-7 w-7 text-white hover:bg-white/40 bg-transparent"
          onClick={() => copyCode()}
        >
          {copied ? (
            <Check className="h-5 w-5" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </Button>
      </div>
      <style jsx>
        {`
          .code {
            position: relative;
          }

          /* Override Prism styles */
          .code :global(pre[class*="language-"]) {
            text-shadow: none;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}
