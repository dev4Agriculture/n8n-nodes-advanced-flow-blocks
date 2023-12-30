import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class For implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'For',
		name: 'for',
		icon: 'file:for.svg',
		group: ['route'],
		version: [1, 2, 2.1, 2.2, 2.3],
		description:
			'Base for a For-Loop',
		defaults: {
			name: 'FOR'
			},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: ['main','main'],
		inputNames: ['dataIn','counterIn'],
		requiredInputs: '={{ $version < 2.3 ? undefined : 1 }}',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main', 'main', 'main'],
		outputNames: ['finished', 'dataOut','counterOut'],
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
				displayName: 'EndValue',
				name: 'endValue',
				placeholder: '1',
				type: 'number',
				description: 'The last index',
				default: 4,
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
				displayName: 'useInput',
				name: 'useInput',
				placeholder: 'true',
				type: 'boolean',
				description: 'Whether the initial input shall be used within the loop?',
				default: true,
			},


		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnCounter: INodeExecutionData[] = [];
		let returnData: INodeExecutionData[] = [];



		const startValue = this.getNodeParameter("startValue",0) as number;
		const endValue = this.getNodeParameter("endValue",0) as number;
		const stepValue = this.getNodeParameter("stepValue",0) as number;
		const useInput =  this.getNodeParameter("useInput",0) as boolean;

		let data = this.getInputData(0);
		let counter = this.getInputData(1);

		const nodeContext = this.getContext('node');
		if(nodeContext.runIndex === undefined){
			nodeContext.runIndex = 0;
			if( !useInput){
				data = [{json:{counter:1}}];
			} else {
				if( data == undefined){
					data = [];
				}
			}
		} else {
			nodeContext.runIndex ++;
		}

		for(let  entry of data){
			returnData.push(entry);
		}

		let currentValue = startValue - stepValue;
		if((counter != null) && (counter.length == 1)){
			currentValue = counter[0].json.counter as number;
		}

		currentValue += stepValue;
		returnCounter.push({json:{
			counter: currentValue,
			index: nodeContext.runIndex
		}})

		if( (stepValue > 0 && currentValue >= endValue) ||
				(stepValue < 0 && currentValue <= endValue)
		){
			if( useInput == false){
				returnData = returnData.slice(1);
			}
			return [returnData,[], []];
		} else {
			return [[],returnData, returnCounter];
		}

	}

}
