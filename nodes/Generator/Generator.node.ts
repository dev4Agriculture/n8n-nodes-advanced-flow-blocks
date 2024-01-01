import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';


export class Generator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Generator',
		name: 'generator',
		icon: 'file:generator.svg',
		group: ['helpers'],
		version: [1, 2, 2.1, 2.2, 2.3],
		description:
			'Create Objects',
		defaults: {
			name: 'GENERATOR'
			},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: ['main'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main'],
		properties: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 1
			}
		],
	};






	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const amount = this.getNodeParameter("amount",0) as number;

	  const data: INodeExecutionData[] = [];
		for(let a=0;a<amount;a++){
				data.push({
					json:{

					}
				})
		};

		return [data];
	}

}
