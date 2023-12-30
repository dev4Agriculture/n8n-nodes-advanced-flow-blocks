import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Select implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Select',
		name: 'select',
		icon: 'file:select.svg',
		group: ['transform'],
		version: 1,
		description:
			'Select a previous entry to be the latest one',
		defaults: {
			name: 'SELECT'
		},
		inputs: ['main'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main'],
		outputNames: ['out'],
		properties: [
			{
				displayName: 'Entry',
				name: 'entry',
				placeholder: 'Select entry',
				type: 'string',
				description: 'The Input Value',
				default : "Hallo"
		}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let parameter:string = this.getNodeParameter("entry",0) as string ;
		//console.log("Context: " + JSON.stringify(this.getContext(parameter)));
		console.log("ExecuteData: " + JSON.stringify(this.getExecuteData()));
		console.log(": " + JSON.stringify(this.getInputData(undefined,parameter)));

		return [this.getInputData(undefined, this.getNodeParameter("entry",0) as string)];
	}
}
