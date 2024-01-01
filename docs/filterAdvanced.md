# Filter Advanced
![Logo](./data/logos/FilterAdvanced.svg)

The Filter Advanced node equals the Filter Node of the default n8n package (as of version 1.20.0), but it provides an additional node exit to read statistics.


## Input

Input is a list of data that shall be filtered

## Output

The output includes 3 branches

### Kept

The kept branch includes all those entries that match the filter.

### Dropped

The dropped branch includes all entries that did not match the filter.

### Statistic

The statistic branch can be used to read some meta data of the operation. It includes only 1 element with the following parameters:

* **any**: True if any match was found,
* **none**: Only true if no match was found,
* **kept**: The number of entries that matched the filter
* **dropped**: The number of dropped entries


## Example

An example use case for this could simply be if you want to handle both results; the matched and the dropped. For example, if an entry in a ToDo Tool can have a done status. If it's not yet "Done", you might want to check for the date in a next step and send a notification when it's outdated. For those that are "done", you might just want to set them to archived.
