# Paging
![Logo](./data/logos/paging.svg)

The paging node is specifically used for the purpose of calling workflows multiple times until they don't return any further data. 

## Input

The Paging node has one input that receives new Data

## Outputs

The Paging node has 2 Outputs

### Counter

The Counter provides the index and some meta data that can be used to trigger the next workflow. E.g. you can use the index as a page in an HTTP Request that supports pagination.

### Finish

The Finish-Branch receives the result data when the paging is finished.


This output can be one of the following:

* **All**: All Data is combined to a long list
* **Last**: The last List that included data is returned
* **Shortest**: The result is the shortest list ever received (putting aside an empty result)
* **Longest**: The result is the longest list ever received


## Example

An example might be an API node that supports pagination but only as a single input parameter "Which page would you like to read?"

> **NOTE**: The normal HTTP Node supports Pagination by itself. Using our pagination loop gives you a bit more flexibility in the behavior, but you might not need this at all. So, if you want to use this node with the HTTP Node, check first if the HTTP Nodes pagination is enough for you.



