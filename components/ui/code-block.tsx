"use client";

import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-lisp.min";
import "prismjs/themes/prism-tomorrow.css";

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
      pattern: /(\b(?:Theorem|Schema|apply|Subgoal)\s+)[\w|-|.]+/,
      lookbehind: true,
    },
    /[\w|-|.0-9]+(?=\s*>>)/,
  ],
  operator: />>/,
  keyword: {
    pattern: /\b(?:Theorem|Specification|Set|Schema|Subgoal|Vars)\b/,
  },
  function: [
    /\b(?:apply|forall|exists|case|inst|induction|intros|keep|left|right|search|split|on|to|with)\b/,
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

export function CodeBlock({
  children,
  "data-language": language,
}: {
  children: string;
  "data-language": string;
}) {
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false);
  }, [children]);

  if (!language) language = "adelfa";

  return (
    <div className="code" aria-live="polite">
      <pre ref={ref} className={`language-${language}`}>
        {children}
      </pre>
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
