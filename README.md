![dev4AgLogo](./docs/data/dev4Agriculture.svg)
# n8n-advanced-flow-nodes

This is an n8n community node. It lets you do some advanced flows. The n8n default provides different flow nodes to switch, if or filter data. These nodes come with some disadvantages:

1. There is no possibility to get statistics
2. There is no possibility to check for any/none matches
3. It's not possible to "Store data for later"
4. I was missing a possibility to simply log data on the go
5. I had issues with Paging and a good ForLoop

These advanced flow nodes fix both these issues.

## Who are we?

dev4Agriculture focusses on agricultural software in the B2B area. The n8n nodes in this repository evolved from our own internal automation processes.

## What is n8n

n8n is a low code platform to automate workflows. Find more on https://n8n.io

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

* [Any](./docs/any.md)
* [FilterAdvanced](./docs/filterAdvanced.md)
* [For](./docs/for.md)
* [IfAdvanced](./docs/ifAdvanced.md)
* [Paging](./docs/paging.md)
* [Logger](./docs/logger.md)
* [SizeCheck](./docs/sizeCheck.md)
* [Shelf](./docs/shelf.md)
* [Generator](./docs/generator.md)

## Compatibility

This node was built for n8n version 1.20.0.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)


## Feedback

Your feedback is very welcome, please provide any feedback [here](https://www.dev4agriculture.de/unternehmen/#kontakt) or let's connect on [LinkedIn](https://www.linkedin.com/in/frank-wiebeler/)


## TroubleShooting

### Nodes unknown after updating the version

In older versions of the nodes, we used a Version Number 2.3, which became incompatible in V1.40.1(?) of n8n.
**WorkAround/Fix:** Download the Flow, replace Version 2.3 with Version 4 and reimport the file.
