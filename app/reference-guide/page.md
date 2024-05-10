---
title: Reference Guide
description: Basic introduction to syntax
---

# {% $markdoc.frontmatter.title %}


## Table of Contents

1. [Syntax](#syntax)
2. [Top-level commands](#top-level)
3. [Tactics](#tactics)
4. [Lemmas](#lemmas)
5. [Typing](#typing)
6. [Inductive Restrictions][inductive-restrictions]
7. [Emacs / Proof General Support](#proof-general)



This document will give a basic introduction to the theorem prover and run
through a reasoning example demonstrate how it can be used to reason about LF
specifications. 

## Syntax {% #syntax %}

### Terms

The syntax for terms Canonical LF terms and types follows a similar style to
that used by [Twelf][twelf]. Of note are the following structures:

| Syntax    | Meaning                                             |
| --------- | --------------------------------------------------- |
| `[x] M`   | Term abstraction                                    |
| `{x:A} B` | {%math formula="\\Pi" /%}-type                      |
| `A -> B`  | {%math formula="\\Pi" /%}-type without dependencies |

The names for variables and constants follow the same conventions as
[Twelf][twelf]. Nominal constants are denoted by `n1, n2, ...` 

### Context Expressions {% #syntax-ctx-expressions %}

Context expressions {%math formula="G" /%} are commonly expressed using the
following syntax:

| Syntax         | Meaning                |
| -------------- | ---------------------- |
| <empty string> | Empty context          |
| `Gamma`        | Context variable       |
| `G, n:A`       | Explicit context entry |


### Formulas {% #syntax-formulas %}

The syntax for formulas is the following:

| Syntax                           | Meaning                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `forall x y z ..., F`            | {%math formula="\\forall x\\ \\forall y\\ \\forall z \\ldots . F" /%} (Universal quantification)                         |
| `exists x y z ..., F`            | {%math formula="\\exists x\\ \\exists y\\ \\exists z \\ldots . F" /%} (Existential quantification)                       |
| `ctx Gamma1:C1 Gamma2:C2 ..., F` | {%math formula="\\Pi \\Gamma_1:\\mathcal{C_1}\\ \\Pi \\Gamma_2:\\mathcal{C_2}\\ \\ldots. F" /%} (Context quantification) |
| `F1 => F2`                       | {%math formula="F_1 \\supset F_2" /%} (Implication)                                                                      |
| `F1 /\ F2`                       | {%math formula="F_1 \\land F_2"/%} (Conjunction)                                                                         |
| `F1 \/ F2`                       | {%math formula="F_1 \\lor F_2"/%} (Disjunction)                                                                          |
| `{ G \| - M : A }`               | Atomic formula                                                                                                           |
| `pred M1 M2`                     | Defined predicate                                                                                                        |
| `true`                           | {%math formula="\\top" /%} (true)                                                                                        |
| `false`                          | {%math formula="\\bot" /%} (false)                                                                                       |

## Top-level commands {% #top-level %}

### `Theorem <NAME> : <FORMULA>.`

Starts proof development with the given formula as the goal.


### `Quit.`

Exists from Adelfa.

### `Specification <QUOTED FILENAME>`

Reads in the specification indicated by the given filename.

### `Schema <ID> := {w x ...}(y:A,z:B ...); ... .`

Defines a context schema associated with `<ID>`. For example:

```adelfa
Schema c := {T:o}(x: tm, d: of x T);
            (x:tm, t:tp, d: of x t).
```

### `Set <OPTION> <VALUE>.` {% #command-set %}

Sets the value of options during proof development. It may be used at the top
level or inside theorem construction. The options are currently:

- `search_depth` The maximum number of times to perform type decomposition on
  assumption judgements during the [`search`](#tactic-search) and
  [`assert`](#tactic-assert) tactics. By default, this is set to 5. {% #command-search-depth %}


## Tactics {% #tactics %}

### `search [<NUM>].` {% #tactic-search %}

Search for a derivation of the current goal using matching with assumption
formulas and decomposing judgments into subgoals using LF derivation rules. If a
`<NUM>` is provided, assumption judgements are decomposed `<NUM>` times. If a
`<NUM>` is not provided, the [`search_depth`][search-depth] option is used. The
[`search_depth`][search-depth] can be changed with the [`Set`][set] command. 

### `intros.` {% #tactics-intros %}

Introduces variables and assumptions from a goal formula until it no longer has
top-level universal quantification, context quantification, or implications. 

### `split.` {% #tactics-split %}

Creates subgoals for each sub formula, `F1` and `F2` if the current goal is a
conjunction `F1 /\ F2`.

### `left.` {% #tactics-left %}

Changes the goal to be the left side formula, `F1` if the current goal is a
disjunction, `F1 \/ F2`.

### `right.` {% #tactics-right %}

Changes the goal to be the right side formula, `F2` if the current goal is a
disjunction, `F1 \/ F2`.

### `assert <FORMULA> [<NUM>].` {% #tactics-assert %}

Changes the proof state to one which has the given formula as a goal; once
derivation of this goal is complete returns to the previous proof state with the
given formula added as an assumption. Providing a `<NUM>` will decompose
assumption judgements `<NUM>` times. If the asserted formula can be proven, it
is added to the proof state immediately. This option defaults to
[`search_depth`][search-depth] when not provided and may be changed with the
[`Set`][set] command. 

### `apply <NAME> to <HYP NAMES> [with <BINDINGS>].` {% #tactic-apply %}

Applies a hypothesis of the form `ctx Gamma1:C1 ... Gammaj:Cj, forall X1 ... Xi,
H1 => ... => Hk => F` to argument hypotheses which match `H1, ..., Hk`. The
result is an instantiation of `F`. Either or both of `i` and `j` may be zero. That is,
there need not be universally quantified variables or context variables. The
`with` clause allows specific instantiations of any of the variables `X1 ... Xi` and
`Gamma1 ... Gammaj`.


```adelfa
apply plus-comm to H4.
apply H2 to H5.
```

### `induction on <NUM>.` {% #tactics-induction %}

Given a goal of the form `ctx Gamma1:C1 Gamma2:C2 ..., forall X Y ..., H1 => H2 => ... =>
F` the induction tactic allows you to induct on one of `H1, H2, ...`. The
hypothesis to be inducted on must be an atomic formula. The choice of induction
is based on the number `<NUM>`. Applying the induction tactic results in an
inductive hypothesis being added to the current set of hypotheses. Specifics on
this inductive hypothesis and how it relates to the goal are given in the
section [Inductive Restrictions][inductive-restrictions].

Adelfa supports nested induction through repeated calls to the induction tactic.
See the [Inductive Restrictions][inductive-restrictions] section for more
details. 

### `exists M.` {% #tactics-exists %}

Instantiates an existential goal with the given term, if it is of the correct
arity type. 

### `case <HYP NAME>[(keep)].` {% #tactics-case %}

Performs case analysis on the given assumption formula. By default, the
assumption is removed, use `(keep)` to retain it. 


### `weaken <HYP NAME> with A [<NUM>].`{% #tactics-weaken %}

When the given assumption formula is of the form `{G |- M : A}`, and it can be
verified that the LF type `A` must be well formed in the current context under
`G`, then a new assumption is added in which the typing judgment is weakened to
include the given type. 

### `strengthen <HYP NAME>.`{% #tactics-strengthen %}

If the given assumption formula is of the form `{G, n:A1 |- M : A2}` if `n` does
not appear in `M` or `A2` then a new assumption is added in which the typing
judgment is strengthened to `{G |- M : A2}`. 

### `ctxpermute <HYP NAME> to G.`{% #tactics-ctxpermute %}

If the given assumption is of the form `{G' |- M:A}`, and if the given context
is a valid permutation of the context `G'` (i.e. does not violate dependencies),
then a new assumption is added with the permuted context expression `G`. 

### `permute <HYP NAME> with <PERM>.`{% #tactics-permute %}

Applies a permutation of nominal constants to the argument hypothesis. `<PERM>`
must be a complete permutation. Mappings can be unidirections `n1 -> n2, n2 ->
n` or bidirectional `n1 <-> n2`.  If the provided permutation is complete and
limited to be within the relevant assumption's restricted set, a new assumption
is added with the permutation applied to it. 

###  `inst <HYP NAME> with n = M.`{% #tactics-inst %}

If the given assumption formula is of the form `{G1,n:B,G2 |- M:A}`, and the
term `M` can be determined to be such that `{G1 |- M : B}` is valid then this tactic
replaces the given assumption with one in which `n:B` is removed from the context
expression and all occurrences of `n` are replaced by `M`. 

### `prune <HYP NAME>.`{% #tactics-prune %}

If the given assumption is of the form `{G |- X n1 ... nm : A}` for some
eigenvariable `X` and distinct nominal constants `n1,...,nm` then this tactic
will prune those nominal constants appearing as arguments to `X` which 

1. Do not already appear in `G` and 
2. Are not permitted in the instantiations for the context variable in `G`.

### `undo.`{% #tactics-undo %}

Undoes the last step of reasoning.

### `skip.`{% #tactics-skip %}

Skip to the next subgoal of the derivation and completes the theorem if there
are no more goals.

### `abort.`{% #tactics-abort %}

Abort the proof construction and return to top-level loop without adding formula
to the available lemmas. 

### `unfold [<HYP NAME>].`{% #tactics-unfold %}

If the given assumption formula is a defined predicate then it is unfolded using
the relevant definition, using the first clause which matches. If no assumption
formula is given, the goal formula is unfolded. 

### `applydfn <PROP> [to <HYP NAME>].`{% #tactics-applydfn %}

Applies a clause of the definition of <PROP> to the given assumption formula.
The first clause which matches is the one used. If no assumption formula is
provided the definition is applied to the goal formula. 

## Lemmas {% #lemmas %}

To use a lemma, prove it as a theorem and then refer to it by name in another
proof using the [`apply`][apply] tactic. For example, 

```adelfa
Theorem my_lemma : ...
...

Theorem my_theorem : ...
...
apply my_lemma to H3 H5.
...
```

## Typing {% #typing %}

Adelfa's logic is simply-typed using simple arity typing based on a single base
type `o` and constructor `->`. All terms and formulas must be well-typed. 

## Inductive Restrictions {% #inductive-restrictions %}

Inductive restrictions are represented by `*` (smaller) and `@` (equal). They are
used to track the size of inductive arguments rather than using explicit numeric
values. For example, suppose we apply `induction on 1.` when trying to prove the
following subject reduction theorem, 

```adelfa
============================
forall E V T D1 D2, {|- D1 : eval E V} -> {|- D2: of E T} -> 
  exists D3, {|- D3: of V T}
```

We will get the following proof state.

```adelfa
IH : forall E V T D1 D2, {|- D1 : eval E V}* -> {|- D2: of E T} -> 
      exists D3, {|- D3: of V T}
============================
forall E V T D1 D2, {|- D1 : eval E V}@ -> {|- D2: of E T} -> 
  exists D3, {|- D3: of V T}
```

Here we have an inductive hypothesis where the inductive argument is flagged
with `*`. This means that we can only apply that hypothesis to an argument which
also has the `*`. Because `*` means smaller, in order to get an argument with a
`*` we must perform case analysis on an argument that is "equal" which we denote
by `@`. Thus, the above proof proceeds by first doing `intros.` and then case
analysis on `{|- D1 : eval E V}@`. This will give us two subgoals, one which is
trivial and the other which has hypotheses tagged with `*` and thus eligible for
use with the inductive hypothesis. 

## Emacs / Proof General Support {% #proof-general %}


The distribution of Adelfa provides a [Proof General][pg] mode and syntax
highlighting for developing proofs in its `PG/` directory. To use it, install
Proof General as instructed by its documentation. Then copy the entirety of the
`adelfa` directory into the installation location of Proof General. Add an entry
for Adelfa in PG's `proof-assistant-table-default` resembling `(adelfa "Adelfa"
"ath")`, located in `PG/generic/proof-site.el`. Afterwards, the
`proof-assistant-table-default` should resemble something similar to: 

```emacs-lisp
(defconst proof-assistant-table-default
    '(
      ;; Main instances of PG.

      (isar "Isabelle" "thy")
      (coq "Coq" "v" nil (".vo" ".glob"))
      (easycrypt "EasyCrypt" "ec" "\\.eca?\\'")
      (phox "PhoX" "phx" nil (".phi" ".pho"))
      (adelfa "Adelfa" "ath")
```

In your Emacs configuration, commonly located at `~/.emacs` or `~/.emacs.d/init.el`, add the following lines: 

```emacs-lisp
(defconst proof-site-file
  (expand-file-name "path-to-pg/PG/generic/proof-site.el"))

(when (file-exists-p proof-site-file)
  (setq proof-splash-enable nil
        proof-output-tooltips nil
        proof-three-window-mode-policy 'horizontal)

  (load-file proof-site-file)

  (add-hook 'adelfa-mode-hook
            #'(lambda ()
                (setq indent-line-function 'indent-relative)))

  (setq auto-mode-alist
        (append
         '(("\\.ath\\'" . adelfa-mode))
         auto-mode-alist)))
```

Where `path-to-pg` should be changed to the file path of your proof general installation. 

[twelf]: https://twelf.org
[search-depth]: #command-search-depth
[set]: #command-set
[inductive-restrictions]: #inductive-restrictions
[apply]: #tactic-apply[pg]: https://proofgeneral.github.io/