import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathFormula({ formula }: { formula: string }) {
  const html = katex.renderToString(formula, {
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}