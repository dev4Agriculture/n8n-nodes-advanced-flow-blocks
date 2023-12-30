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
		version: 1,
		description:
			'Base for a For-Loop',
		defaults: {
			name: 'FOR'
			},
		inputs: ['main','main',"main"],
		inputNames: ['parameters','dataIn','counterIn'],
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
			}


		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnCounter: INodeExecutionData[] = [];
		const returnData: INodeExecutionData[] = [];

		const startValue = this.getNodeParameter("startValue",0) as number;
		const endValue = this.getNodeParameter("endValue",0) as number;
		const stepValue = this.getNodeParameter("stepValue",0) as number;


		const parameter = this.getInputData(0);
		let data = this.getInputData(1);
		let counter = this.getInputData(2);

		console.log("Counter: " + JSON.stringify(counter));
		console.log("Parameters: " + JSON.stringify(parameter));
		console.log("Data: "+ JSON.stringify(data));

		if(data== null || data.length == 0){
			returnData.push({json:{entry:1}});
		} else {
			for(let  entry of data){
				returnData.push(entry);
			}
		}

		let currentValue = startValue - stepValue;
		if((counter != null) && (counter.length == 1)){
			currentValue = counter[0].json.counter as number;
		}

		currentValue += stepValue;
		returnCounter.push({json:{counter: currentValue}})

		if( (stepValue > 0 && currentValue >= endValue) ||
				(stepValue < 0 && currentValue <= endValue)
		){
			console.log("For Loop finished!");
			console.log("CurrentValue: " + currentValue);
			console.log("StartValue: " + startValue);
			console.log("EndValue: " + endValue);
			console.log("stepValue:" + stepValue);
			return [returnData,[], []];
		} else {

			console.log("Looping....");
			console.log("CurrentValue: " + currentValue);
			console.log("StartValue: " + startValue);
			console.log("EndValue: " + endValue);
			console.log("stepValue:" + stepValue);
			return [[],returnData, returnCounter];

		}

	}
}
