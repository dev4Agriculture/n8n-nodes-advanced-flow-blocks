import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class Paging implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Paging',
		name: 'paging',
		icon: 'file:Paging.svg',
		group: ['route'],
		version: [1, 2, 2.1, 2.2, 2.3],
		description:
			'Paging functionality for APIs surrounding HTTP requests but missing the Paging',
		defaults: {
			name: 'PAGING'
			},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: ['main'],
		inputNames: ['dataIn'],
		requiredInputs: '={{ $version < 2.3 ? undefined : 1 }}',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main', 'main'],
		outputNames: ['finished','paging'],
		properties: [
			{
				displayName: 'StartValue',
				name: 'startValue',
				placeholder: '1',
				type: 'number',
				description: 'The type of values to compare',
				default: 1,
			},
			{
				displayName: 'StepValue',
				name: 'stepValue',
				placeholder: '1',
				type: 'number',
				description: 'The step per looping',
				default: 1,
			},
			{
				displayName: 'MaxAmount',
				name: 'maxAmount',
				placeholder: '100',
				type: 'number',
				description: 'The maximum value to be requested per call',
				default: 100,
			},
			{
				displayName: "Result",
				name: "result",
				type: 'options',
				options: [
					{
						name: 'All Collected',
						value:"all"
					},
					{
						name: "Last List",
						value:"last"
					},
					{
						name: "Longest List",
						value: "longest"
					},
					{
						name: "Shortest List",
						value: "shortest"
					}

				],
				default:'all'
			}


		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnCounter: INodeExecutionData[] = [];
		const returnData: INodeExecutionData[] = [];



		const startValue = this.getNodeParameter("startValue",0) as number;
		const maxAmount = this.getNodeParameter("maxAmount",0) as number;
		const stepValue = this.getNodeParameter("stepValue",0) as number;
		const resultType = this.getNodeParameter("result",0) as string;

		let data = this.getInputData(0);

		const nodeContext = this.getContext('node');


		//Check if we shall call the finish branch
		if (data.length == 0 || (
				( data.length == 1) &&
				(Object.keys(data[0].json).length == 0)
			)
		){
			if(nodeContext.data!==undefined){
				for(let entry of nodeContext.data){
					returnData.push(entry);
				}
				return [returnData,[]];
			}
		}


		//Initialize or update counter
		if(nodeContext.runIndex === undefined){
			nodeContext.runIndex = 0;
			nodeContext.index = startValue;
			nodeContext.data = [];
			data = [];
		} else {
			nodeContext.runIndex ++;
			nodeContext.index += stepValue;
		}


		//Update the DataList
		switch(resultType ){
			case "all":
				for(let  entry of data){
					nodeContext.data.push(entry);
				}
				break;
			case "last":
				nodeContext.data = [];
				for(let  entry of data){
					nodeContext.data.push(entry);
				}
				break;
			case "longest":
				if( nodeContext.data.length < data.length){
					nodeContext.data = [];
					for(let  entry of data){
						nodeContext.data.push(entry);
					}
				}
				break;
			case "shortest":
				if(( data.length > 0 && nodeContext.data.length > data.length)||
					 ( data.length > 0 && nodeContext.data.length == 0)
				){
					nodeContext.data = [];
					for(let  entry of data){
						nodeContext.data.push(entry);
					}
				}
				break;
		}


		let entry = {
			json:{
				runIndex: nodeContext.runIndex,
				index : nodeContext.index,
				maxAmount : maxAmount,
				count : nodeContext.data.length,
				steps: stepValue
			}
		}
		returnCounter.push(entry);

		return [[], returnCounter];
	}

}
