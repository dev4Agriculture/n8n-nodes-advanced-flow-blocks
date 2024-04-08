import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class ShelfPop implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pop',
		name: 'shelfPop',
		icon: 'file:ShelfPop.svg',
		group: ['route'],
		version: [1, 2, 3],
		description:
			'Pop data off the shelf',
		defaults: {
			name: 'POP'
			},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: ['main'],
		inputNames: ['dataIn'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main'],
		properties: [
			{
				displayName: 'Key',
				name: 'key',
				placeholder: 'key',
				type: 'string',
				description: 'The key associated with the data',
				default: "key",
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const key = this.getNodeParameter("key",0) as number;
		const data: INodeExecutionData[] = [];

		if(key === undefined){
			console.log("No Key found");
			return [[]]
		}

		const nodeContext = this.getContext('flow');

		if( nodeContext.shelf === undefined){
			console.log("Shelf is empty")
			return [[]];
		}

		console.log(JSON.stringify(nodeContext.shelf));
		if( nodeContext.shelf[key] === undefined){
			console.log("Shelf key not found: " + key)
			return [[]];
		}

		for(let entry of nodeContext.shelf[key]){
			data.push(entry);
		}

		return [data];

	}

}
