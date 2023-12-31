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
			{
				displayName: 'OverrideCounter',
				name: 'overrideCounter',
				placeholder:'false',
				type: 'boolean',
				description: 'Whether the counter shall be overwritten by incoming data',
				default:true
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnCounter: INodeExecutionData[] = [];
		let returnData: INodeExecutionData[] = [];



		let startValue = this.getNodeParameter("startValue",0) as number;
		let endValue = this.getNodeParameter("endValue",0) as number;
		let stepValue = this.getNodeParameter("stepValue",0) as number;
		let useInput =  this.getNodeParameter("useInput",0) as boolean;
		let override = this.getNodeParameter("overrideCounter",0) as boolean;

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

		if(nodeContext.currentValue === undefined){
			nodeContext.currentValue = startValue - stepValue;
		}

		for(let  entry of data){
			returnData.push(entry);
		}

		let currentValue = nodeContext.currentValue;
		if((counter != null) && (counter.length == 1)){
			if(override == true){
				currentValue = counter[0].json["counter"] as number;
				stepValue = counter[0].json["stepValue"] as number;
				endValue = counter[0].json["endValue"] as number;
			}
		}

		currentValue += stepValue;
		nodeContext.currentValue = currentValue;
		returnCounter.push({json:{
			counter: currentValue,
			start: startValue,
			step: stepValue,
			end: endValue,
			runIndex: nodeContext.runIndex,
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
