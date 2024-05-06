import { CodeBlock } from "@/components/ui/code-block";
import { H2, P } from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <H2>The Adelfa Proof Assistant</H2>
      <P>
        Adelfa is an interactive proof assistant for reasoning about
        specifications written in the Edinburgh Logical Framework (LF). Adelfa
        is based on a new logic named 𝓛<sub>LF</sub> whose atomic formulas
        represent typing judgements in LF and in which complex formulas can be
        constructed using the usual collection of propositional connectives and
        quantifiers over variables representing LF terms and contexts.
        Quantification over terms is qualified by arity types that indicate
        functional structure but that leave dependency information to the domain
        of the body of the formula. Context quantification is governed by a
        special kind of type, referred to as a context schema, that describes a
        finite collection of patterns of declarations out of which an
        instantiating (ground) context may be constructed. The meaning of
        formulas in this logic is described by using derivability in LF to
        determine the validity of ground atomic formulas and attributing a
        substitution semantics to the quantifiers. Complementing the logic is a
        proof system that provides the basis for establishing the validity of
        formulas in the logic. Particular proof rules in this proof system
        embody a means for carrying out case analyses relative to LF
        derivability and for reasoning inductively over the heights of LF
        derivations. The logic also provides a flexible basis for additional
        rules, such as ones that encode meta-theorems related to derivability in
        LF. Adelfa implements a collection of such rules as well.
      </P>
    </>
  );
}
