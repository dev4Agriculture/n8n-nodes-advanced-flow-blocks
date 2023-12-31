# SizeCheck

![Logo](./data/logos/SizeCheck.svg)


The SizeCheck Node checks if the size of the input list is less, equal or more than a given number

## Parameters

### Threshold

The threshold that defines the True/False Result

### CountEmptyItems

Shall those Items be counted that do not include any keys?

> **Hint**: This can be used to check if the last node exported an empty result.

## Input

The list that shall be checked

## Output

The input List to the correct output, depending on the comparison result.



## Example

![Example for SizeCheck](./data/examples/sizecheck.png)

In this example, some data is generated in the Code Node. Depending on the Result for the SizeCheck, different Logs are triggered


## Example Scenarios

The Node is mostly used to monitor size limits. Imagine some input that grows over time, so with every new call of the work flow, a bit more data is handled. You might not even know if the flow might ever exceed the critical amount of entries that you can write into a table. 

So, you can either put work into such edge case right from the beginning or you put it "on the shelf" for later. Now you could e.g. trigger the activation of a ticket in your ticketsystem to tackle this topic. 
