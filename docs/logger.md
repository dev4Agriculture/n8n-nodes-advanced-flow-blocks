# Logger
<img src="./data/logos/logger.svg" alt="image" width="100" height="auto">


The logger node is meant to simplify the development process of nodes

## Parameters

### Target

The target where to output the log; UI (Console of the Developer Tools), ServerLogs or Both. 

> **Hint**: For debugging purpose you would use the UI. For LogMonitoring you would use Server

### Print DateTime

If the DateTime shall be printed. Useful to differentiate between different runs of the same node

### Print ItemsCount

Adds an output line in the form of "Items: {number of Items}"

### Description

Adds a Line of Description. If "OutputData" is set to false, this can be used to output single infos like "This part of execution was reached!"

### OutputType

The Type can be either JSON or Table. 


#### JSON

If you select JSON, you can activate the output of MetaData


#### Table

The Table is in form of a MarkDown Table. If you want to have it better readable in the console, activate the "Fill with Spaces"-Marker

## Inputs 

The input is the data that shall be logged


## Outputs

The Output just forwards the input data


## Example

![Example](./data/examples/if-advanced.png)

When developing a workflow, it can be anoying to jump between nodes to debug single nodes or to jump between executions and the workflow setup.  

The Logger Node can log the data in form of a JSON or Table to the LogOutput of the Browser and/or to the logs of the server.

Additionally a description can be provided so that you could also just print a simple message.

Most of the other nodes examples make use of the Logger Node
