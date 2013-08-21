---
title: Our journey from UML/MDD to Scala macros
location: 
start: 
end: 
type: Long
speaker: hayssam-saleh
topic: 
level: intermediate
language: fr
---

Ebiznext, the company I work for has built custom software for the past 
ten years through the use of UML/MDA techniques to produce code 
faster, guarantee the code quality and maintain synchronization between 
the documentation and the code. Until recently, we applied the same 
technique and used to same tools to generate code for the Typesafe stack. 
With the advent of macros in scala, the process is being reversed. Instead 
of a top down approach going from the model to the code, we will go the 
other way around.

Throughout this session I will describe how we make use of Scala macros 
in order to produce the database access layer code.

###The Macros library

The first part describe (1) the set of macros that are in charge of 
generating all the boilerplate code Slick needs to describe the database 
schema and (2) the set of macros that we defined to implement dynamic 
finders (à la grails) to supplementthe Slick DSL.

###Generating Slick boilerplate code with macros annotations

This part describes how we generate abstract syntax trees and how 
symbols, trees and types correlate to the source code through the 
implementation of the @Entity and @Transactional macro annotations.
The @Entity macro annotation when applied to a case class generates all 
the boilerplate code Slick requires to describe a table including foreign 
keys for members who reference another case class
The @Transactional annotation when applied to the method definition, 
generates the required enclosing block required to execute the slick code 
inside a thread local session

###Using Def macros to create dynamic finders.

We initially used the Scala Dynamic marker trait to generate dynamic 
finders. We shifted to Def macros for obvious reasons.
This part dives into the new Scala 2.10 reflection API and how we use it to 
create dynamic finders and CRUD methods.
