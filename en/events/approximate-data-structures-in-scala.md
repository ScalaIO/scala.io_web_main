---
title: Approximate Data Structures in Scala
location: 
start: 
end: 
type: Short
speaker: sam-bessalah
topic: 
level: intermediate
language: en
---

Some simple operations like counting the number of distinct occurrences, finding the most frequent items or determining if an element is contained or not in a data set, are almost impossible to compute with the standard collection when the data does not fit into memory. This is the case when dealing with continuous streams of data or just plain large data sets. 
Thanks to data structures like Bloom Filters, HyperLogLog or Min hashes, some of those simple  but common operations can be achieved very easily but at the cost of exact accuracy.
We will see, how using the Twitter's library AlgeBird how the Scala language and functional programming idioms make building those data structures a cake walk. ;)