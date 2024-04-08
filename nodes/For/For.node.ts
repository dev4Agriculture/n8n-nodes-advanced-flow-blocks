import {
	sleep,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class For implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'For',
		name: 'for',
		icon: 'file:For.svg',
		group: ['route'],
		version: [1, 2, 3],
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
				displayName: "Info! The For-Loop includes a certain risk to block the server for a long while. To avoid this, we have a safety switch for an execution time of maximum 1000 runs/ 2 minutes. Please only deactivate this switch if you're really sure you know what you're doing and if you have access to your backend to restart it!",
				name: "info",
				type: "notice",
				default:""
			},
			{
				displayName: 'SafetySwitch',
				name: 'safetySwitch',
				placeholder:'true',
				type: 'boolean',
				description: 'Whether the endless-loop-prevention shall be active, attention: Only deactivate this if you are sure you know what you are doing!',
				default:true,
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnCounter: INodeExecutionData[] = [];
		let returnData: INodeExecutionData[] = [];



		let startValue = this.getNodeParameter("startValue",0) as number;
		let endValue = this.getNodeParameter("endValue",0) as number;
		let stepValue = this.getNodeParameter("stepValue",0) as number;
		let useInput =  this.getNodeParameter("useInput",0) as boolean;
		let safetySwitch = this.getNodeParameter("safetySwitch",0) as boolean;

		let data = this.getInputData(0);

		const nodeContext = this.getContext('node');
		if(nodeContext.runIndex === undefined){
			nodeContext.startTime = new Date().getTime();
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
			if( safetySwitch == true){
				if(
					( nodeContext.runIndex > 1000)||
					( (new Date().getTime() - nodeContext.startTime) > 120000)
				){
						return [[],[],[]]
				}
				if( nodeContext.runIndex % 100 == 0){
					sleep(400);
				}
			}
		}

		if(nodeContext.currentValue === undefined){
			nodeContext.currentValue = startValue - stepValue;
		}

		for(let  entry of data){
			returnData.push(entry);
		}

		let currentValue = nodeContext.currentValue;

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
