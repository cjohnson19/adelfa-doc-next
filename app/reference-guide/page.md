---
title: Reference Guide
description: Reference guide for Adelfa
---


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

```adelfa
%Every natural number is either even or odd

Specification "even-or-odd.lf".

Theorem even-or-odd :
  forall N, {N : nat} => (exists D, {D : even N}) \/ (exists D, {D : odd N}).
induction on 1. intros. case H1.
  %case 1: N = (s x)
    apply IH to H2. case H3.
      %case 1.1: even x
        right. exists (odd-s x D). search.
      %case 1.2: odd x
        left. exists (even-s x D). search.
  %case 2: N = z
    left. exists even-z. search.
```