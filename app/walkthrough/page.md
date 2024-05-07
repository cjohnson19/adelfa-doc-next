---
title: Walkthrough
description: A sample walkthrough of a subject reduction proof
---

# {% $markdoc.frontmatter.title %}

{% $markdoc.frontmatter.description %}

In this walkthrough you will learn how to state and prove theorems using Adelfa.
You can follow along using the specification file [`stlc.lf`](/stlc/stlc.lf) and
theorem development [`stlc.ath`](/stlc/stlc.ath). 

## Specification

The following Canonical LF signature will encode typing and evaluation in the
simply typed {%math formula="\\lambda"/%}-calculus and form the basis for our
reasoning.

```adelfa-signature
ty : type.
arr : {T:ty}{U:ty} ty.

tm : type.
app : {E1:tm}{E2:tm} tm.
abs : {T:ty}{R:{x:tm}tm} tm.

of : {E:tm}{T:ty}type.
of_app : {M:tm}{N:tm}{T:ty}{U:ty}
           {a1:of M (arr U T)} {a2:of N U}
           of (app M N) T.
of_abs : {R : {x:tm} tm}{T:ty}{U:ty}
           {a1:({x:tm}{z:of x T} of (R x) U)}
           of (abs T ([x] R x)) (arr T U).

eval : {E1:tm}{E2:tm} type.
eval_abs : {R:{x:tm} tm}{T:ty}
             eval (abs T ([x] R x)) (abs T ([x] R x)).
eval_app : {M:tm}{N:tm}{V:tm}{R:{x:tm} tm}{T:ty}
             {a1:eval M (abs T ([x] R x))}{a2:eval (R N) V}
             eval (app M N) V.
```

The property we are interested in for this example is that of showing subject
reduction.

Saving the above signature in a file `stlc.lf` we load it into Adelfa using the
following command. 

```adelfa
>> Specification "stlc.lf".
```

## Reasoning

We state subject reduction in Adelfa by:

```adelfa
>> Theorem sr_eval : forall E V T D1 D2,
    {D1 : eval E V} => {D2 : of E T} => exists D, {D : of V T}.

Subgoal sr_eval:

==================================
forall E, forall V, forall T, forall D1, forall D2,
  {D1 : eval E V} => {D2 : of E T} => exists D, {D : of V T}
```

The formula states that whenever there exist inhabitants `D1` and `D2` of types `eval
E V` and `of E T` respectively, then there must exist an inhabitant, `D`, exhibiting
that `V` is also of type `T`. 

We will prove this theorem by induction on the height of the derivation that `E`
evaluates to `V`. 


```adelfa
sr_eval >> induction on 1.

Subgoal sr_eval:

IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}

==================================
forall E, forall V, forall T, forall D1, forall D2,
  {D1 : eval E V}@ => {D2 : of E T} => exists D, {D : of V T}
```

The next step is to introduce eigenvariables and context variables for any
quantifiers and introduce the implications in the goal as hypotheses. 

```adelfa
sr_eval >> intros.

Subgoal sr_eval:

Vars: D2:o, D1:o, T:o, V:o, E:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H1:{D1 : eval E V}@
H2:{D2 : of E T}

==================================
exists D, {D : of V T}
```

Now we perform case analysis on `{D1 : eval E V}@` using the
[`case`](/reference-guide#tactics-case) tactic. This will split the proof into
two branches based on the two possible ways in which `E` can evaluate to `V`.
Each of the different proof branches is called a subgoal. In general, only the
first subgoal will be displayed in full; the other subgoals will be shown
without their hypotheses. When the first subgoal is completed, the prover will
move to the next subgoal. 

```adelfa
sr_eval >> case H1.

Subgoal sr_eval.1:

Vars: R:(o) -> o, T1:o, a1:o, a2:o, M:o, N:o, D2:o, T:o, V:o
Nominals: n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H2:{D2 : of (app M N) T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{T1 : ty}*
H8:{a1 : eval M (abs T1 ([x]R x))}*
H9:{a2 : eval (R N) V}*

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([c31]R c31)) T}
```

We now perform case analysis on the second hypothesis, `{D2 : of (app M N) T}`,
to obtain derivations for the typing of both subterms `M` and `N`. 

```adelfa
sr_eval.1 >> case H2.

Subgoal sr_eval.1:

Vars: D3:o, D4:o, D5:o, R:(o) -> o, T1:o, a1:o, a2:o, M:o, N:o, T:o, V:o
Nominals: n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{T1 : ty}*
H8:{a1 : eval M (abs T1 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([c31]R c31)) T}
```

We are now able to apply the inductive hypothesis with the assumptions `H8` and
`H14`. 


```adelfa
sr_eval.1 >> apply IH to H8 H14.

Subgoal sr_eval.1:

Vars: D:(o) -> o, D3:o, D4:o, D5:o, R:(o) -> o, T1:o, a1:o, a2:o, M:o, N:o, T
        :o, V:o
Nominals: n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{T1 : ty}*
H8:{a1 : eval M (abs T1 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}
H16:{D n : of (abs T1 ([x]R x)) (arr D3 T)}

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([x]R x)) T}
```

We can now analyze the new assumption to obtain a typing judgement for `R`. 

```adelfa
sr_eval.1 >> case H16.

Subgoal sr_eval.1:

Vars: a3:(o) -> (o) -> (o) -> o, D3:o, D4:o, D5:o, R:(o) -> o, a1:o, a2:o, M:
        o, N:o, T:o, V:o
Nominals: n3:o, n2:o, n1:o, n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{D3 : ty}*
H8:{a1 : eval M (abs D3 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}
H17:{n1:tm |- R n1 : tm}
H18:{D3 : ty}
H19:{T : ty}
H20:{n2:tm, n3:of n2 D3 |- a3 n n2 n3 : of (R n2) T}

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([x]R x)) T}
```

The nominal constants in the hypothesis `H20` are placeholders, and so can be
instantiated by any particular terms of the appropriate type. In this instance,
we want to replace `n2` with `N` and `n3` with `D5`. 

```
sr_eval.1 >> inst H20 with n2 = N.

Subgoal sr_eval.1:

Vars: a3:(o) -> (o) -> (o) -> o, D3:o, D4:o, D5:o, R:(o) -> o, a1:o, a2:o, M:
        o, N:o, T:o, V:o
Nominals: n3:o, n2:o, n1:o, n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{D3 : ty}*
H8:{a1 : eval M (abs D3 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}
H17:{n1:tm |- R n1 : tm}
H18:{D3 : ty}
H19:{T : ty}
H20:{n2:tm, n3:of n2 D3 |- a3 n n2 n3 : of (R n2) T}
H21:{n3:of N D3 |- a3 n N n3 : of (R N) T}

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([x]R x)) T}
```

```adelfa
sr_eval.1 >> inst H21 with n3 = D5.

Subgoal sr_eval.1:

Vars: a3:(o) -> (o) -> (o) -> o, D3:o, D4:o, D5:o, R:(o) -> o, a1:o, a2:o, M:
        o, N:o, T:o, V:o
Nominals: n3:o, n2:o, n1:o, n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{D3 : ty}*
H8:{a1 : eval M (abs D3 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}
H17:{n1:tm |- R n1 : tm}
H18:{D3 : ty}
H19:{T : ty}
H20:{n2:tm, n3:of n2 D3 |- a3 n n2 n3 : of (R n2) T}
H21:{n3:of N D3 |- a3 n N n3 : of (R N) T}
H22:{a3 n N D5 : of (R N) T}

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([x]R x)) T}
```

We are now able to apply the inductive hypothesis with `(R N)` to obtain a
typing derivation for `V`. 

```
sr_eval.1 >> apply IH to H9 H22.

Subgoal sr_eval.1:

Vars: a3:(o) -> (o) -> (o) -> o, D:(o) -> (o) -> (o) -> (o) -> o, D3:o, D4:o,
        D5:o, R:(o) -> o, a1:o, a2:o, M:o, N:o, T:o, V:o
Nominals: n3:o, n2:o, n1:o, n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{D3 : ty}*
H8:{a1 : eval M (abs D3 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}
H17:{n1:tm |- R n1 : tm}
H18:{D3 : ty}
H19:{T : ty}
H20:{n2:tm, n3:of n2 D3 |- a3 n n2 n3 : of (R n2) T}
H21:{n3:of N D3 |- a3 n N n3 : of (R N) T}
H22:{a3 n N D5 : of (R N) T}
H23:{D n3 n2 n1 n : of V T}

==================================
exists D, {D : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([x]R x)) T}
```

We now instantiate `D` in the goal formula with the term `(D n3 n2 n1 n)` for
which we now have an appropriate typing derivation in the premises. 

```
sr_eval.1 >> exists (D n3 n2 n1 n).

Subgoal sr_eval.1:

Vars: a3:(o) -> (o) -> (o) -> o, D:(o) -> (o) -> (o) -> (o) -> o, D3:o, D4:o,
        D5:o, R:(o) -> o, a1:o, a2:o, M:o, N:o, T:o, V:o
Nominals: n3:o, n2:o, n1:o, n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H3:{M : tm}*
H4:{N : tm}*
H5:{V : tm}*
H6:{n:tm |- R n : tm}*
H7:{D3 : ty}*
H8:{a1 : eval M (abs D3 ([x]R x))}*
H9:{a2 : eval (R N) V}*
H10:{M : tm}
H11:{N : tm}
H12:{T : ty}
H13:{D3 : ty}
H14:{D4 : of M (arr D3 T)}
H15:{D5 : of N D3}
H17:{n1:tm |- R n1 : tm}
H18:{D3 : ty}
H19:{T : ty}
H20:{n2:tm, n3:of n2 D3 |- a3 n n2 n3 : of (R n2) T}
H21:{n3:of N D3 |- a3 n N n3 : of (R N) T}
H22:{a3 n N D5 : of (R N) T}
H23:{D n3 n2 n1 n : of V T}

==================================
{D n3 n2 n1 n : of V T}

Subgoal sr_eval.2 is:
 exists D, {D : of (abs T1 ([x]R x)) T}
```

Adelfa is now able to complete the proof by identifying the goal formula with
the identical assumption formula `H23`. This completes the subgoal, and Adelfa
moves to the next subgoal. 

```
sr_eval.1 >> search.

Subgoal sr_eval.2:

Vars: T1:o, R:(o) -> o, D2:o, T:o
Nominals: n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H2:{D2 : of (abs T1 ([x]R x)) T}
H3:{n:tm |- R n : tm}*
H4:{T1 : ty}*

==================================
exists D, {D : of (abs T1 ([x]R x)) T}
```

This subgoal corresponds to when the term `E` is an abstraction and so evaluates
to itself. The proof in this case will simply instantiate the `D` in the goal
formula with `D2` which we know is typable at the indicated type by the second
assumption formula. An application of the
[`search`](/reference-guide#tactic-search) tactic will complete the proof. 

```
sr_eval.2 >> exists D2.

Subgoal sr_eval.2:

Vars: T1:o, R:(o) -> o, D2:o, T:o
Nominals: n:o
IH:
    forall E, forall V, forall T, forall D1, forall D2,
      {D1 : eval E V}* => {D2 : of E T} => exists D, {D : of V T}
H2:{D2 : of (abs T1 ([x]R x)) T}
H3:{n:tm |- R n : tm}*
H4:{T1 : ty}*

==================================
{D2 : of (abs T1 ([x]R x)) T}
```

```
sr_eval.2 >> search.
Proof Completed!
```