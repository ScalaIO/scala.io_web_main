---
title: Extreme speedups and GPGPU: a tale of two practical uses of reified trees.
location: Room 1
start: 24-10-2013 14:15
end: 24-10-2013 15:00
type: Short
speaker: olivier-chafik
topic: 
level: intermediate to expert
language: en
---

With macros introduced experimentally in Scala 2.10, the sky is the limit for compiler hackers and libraries writers: it is trivial to access and modify sources during compilation, and so is it to retain ASTs for use during runtime (process known as reification).

In this talk I will present how to make a practical use of reified trees in Scala, with two applications: run-time (re)compilation for extreme speed, and conversion to another language (OpenCL, which runs on graphic cards).
First, I will explain how a careful handling of captures and composition of reified trees makes it possible to recompile dynamically-assembled trees at runtime, with aggressive optimizations that cannot be achieved statically (see Scalaxy/Reified).
I will then show how these reified trees can be used to rewrite and improve ScalaCL, a library that enables seamless GPGPU programming ("runs Scala on graphic cards"). 
