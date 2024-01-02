import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Sizecheck implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sizecheck',
		name: 'sizecheck',
		icon: 'file:SizeCheck.svg',
		group: ['flow'],
		version: 1,
		description:
			'Check if the current list exceeds a certain amount of data',
		defaults: {
			name: 'SIZECHECK'
		},
		inputs: ['main'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main', 'main', 'main'],
		outputNames: ['less', 'equal', 'more'],
		properties: [
				{
					displayName: 'ThresholdValue',
					name: 'threshold',
					placeholder: '100',
					type: 'number',
					description: 'The value to compare the list size to',
					default: 100,
				}
			],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const items = this.getInputData();
		for(var entry of items){
			returnData.push(entry);
		}
		var compare = this.getNodeParameter("threshold",0) as number;

		if(returnData.length < compare){
			return [returnData,[],[]];
		} else if (returnData.length == compare){
			return [[],returnData,[]];
		} else {
			return [[],[],returnData];
		}
	}
}
