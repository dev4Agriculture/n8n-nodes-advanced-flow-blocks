import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class ShelfPush implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Push',
		name: 'shelfPush',
		icon: 'file:ShelfPush.svg',
		group: ['route'],
		version: [1, 2, 2.1, 2.2, 2.3],
		description:
			'Push the input to the shelf',
		defaults: {
			name: 'PUSH'
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
				description: 'The key to be associated with the data',
				default: "key",
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const key = this.getNodeParameter("key",0) as string;

		let data = this.getInputData(0);

		const nodeContext = this.getContext('flow');

		if( nodeContext.shelf === undefined){
			nodeContext.shelf = {};
		}

		nodeContext.shelf[key] = [];

		for(let entry of data){
			nodeContext.shelf[key].push(entry);
		}
		return [data];

	}

}
