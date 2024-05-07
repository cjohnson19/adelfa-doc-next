---
title: Home
---

# The Adelfa Proof Assistant
      
Adelfa is an interactive proof assistant for reasoning about specifications
written in the Edinburgh Logical Framework (LF). Adelfa is based on a new logic
named {%math formula="\\mathcal{L}_{LF}"/%} whose atomic formulas
represent typing judgements in LF and in which complex formulas can be
constructed using the usual collection of propositional connectives and
quantifiers over variables representing LF terms and contexts. Quantification
over terms is qualified by arity types that indicate functional structure but
that leave dependency information to the domain of the body of the formula.
Context quantification is governed by a special kind of type, referred to as a
context schema, that describes a finite collection of patterns of declarations
out of which an instantiating (ground) context may be constructed. The meaning
of formulas in this logic is described by using derivability in LF to determine
the validity of ground atomic formulas and attributing a substitution semantics
to the quantifiers. Complementing the logic is a proof system that provides the
basis for establishing the validity of formulas in the logic. Particular proof
rules in this proof system embody a means for carrying out case analyses
relative to LF derivability and for reasoning inductively over the heights of LF
derivations. The logic also provides a flexible basis for additional rules, such
as ones that encode meta-theorems related to derivability in LF. Adelfa
implements a collection of such rules as well.

An expository presentation of Adelfa can be found in the paper entitled
["Adelfa: A system for reasoning about LF
specifications"](https://cgi.cse.unsw.edu.au/~eptcs/paper.cgi?LFMTP2021:14). The
reader may also consult a [walkthrough](/walkthrough) of a development that we
have provided on this page and also some of the small, but growing, number of
reasoning [examples](/examples) that are currently available. A detailed
theoretical development of the logic underlying Adelfa is to be found in the
paper entitled ["A logic for reasoning about LF
specifications"](https://arxiv.org/abs/2107.00111).


### Acknowledgments

Work on Adelfa has been supported by the National Science Foundation under Grant
No. CCF-1617771. Any opinions, findings, and conclusions or recommendations
expressed in this material are those of the author and do not necessarily
reflect the views of the National Science Foundation.

{% footer %}
The views and opinions expressed in this page are strictly those of the page
author(s). The contents of this page have not been reviewed or approved by the
University of Minnesota. 
{% /footer %}