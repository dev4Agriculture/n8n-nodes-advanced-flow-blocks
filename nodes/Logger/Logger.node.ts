import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { TableBuilder } from './TableBuilder';


export class Logger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Logger',
		name: 'logger',
		icon: 'file:Logger.svg',
		group: ['helpers'],
		version: [1, 2, 2.1, 2.2, 2.3],
		description:
			'Print a LogOutput either in the Logs or the Developer Tools Console',
		defaults: {
			name: 'LOGGER'
			},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: ['main'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main'],
		properties: [
			{
				displayName: 'PrintTarget',
				name: 'target',
				type: 'options',
				options: [
					{
						name: "UIOnly",
						value: "frontend"
					},
					{
						name: "ServerOnly",
						value: "backend"
					},
					{
						name: "Both",
						value: "both"
					},
				],
				default: 'both'
			},
			{
				displayName: 'Print DateTime',
				name: 'dateTime',
				placeholder: 'true',
				type: 'boolean',
				description: 'Whether a TimeStamp shall be logged',
				default: true,
			},
			{
				displayName: 'Print Items Count',
				name: 'nodeCount',
				placeholder: 'true',
				type: 'boolean',
				description: 'Whether the number of items shall be logged',
				default: true,
			},
			{
				displayName: 'Description',
				name: 'description',
				placeholder: 'true',
				type: 'string',
				description: 'What shall be printed as a title',
				default: "",
			},
			{
				displayName: 'Output Data',
				name: 'outputData',
				type: 'boolean',
				default: true
			},
			{
				displayName: 'Output Type',
				name: 'outputType',
				displayOptions:
				{
					show: {
						outputData: [true]
					}
				},
				placeholder: 'select',
				type: 'options',
				description: 'How Data shall be provided',
				default: 'json',
				options: [
										{
											name: "JSON",
											value: "json"
										},
										{
											name: "Table",
											value: "table"
										}
								]
				},
				{
					displayName: 'Meta Data',
					name: 'metaDataJSON',
					type: 'boolean',
					default: false,
					displayOptions: {
						show : {
							outputType: ['json']
						}
					}
				},
				{
					displayName: 'Fill with Spaces',
					name: 'fillSpaces',
					type: 'boolean',
					default: false,
					displayOptions: {
						show : {
							outputType: ['table']
						}
					}
				}
		],
	};






	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const target = this.getNodeParameter("target",0) as string;
		const printDateTime = this.getNodeParameter("dateTime",0) as boolean;
		const printNodeCount = this.getNodeParameter("nodeCount",0) as number;
		const description = this.getNodeParameter('description',0) as string;
		const outputData = this.getNodeParameter('outputData',0) as boolean;


		let data = this.getInputData();

		let text = "";

		if( printDateTime){
			text += new Date().toLocaleString() + " : \n";
		}

		if( printNodeCount){
			text += "Count: " + data.length + " : \n";
		}

		if( description !== undefined){
			text += "Description: " + description +"\n";
		}

		if( outputData){
			const type = this.getNodeParameter("outputType",0) as string;

			let metaDataJSON = false;
			let fillWithSpaces = false;

			if(type === 'json'){
				metaDataJSON = this.getNodeParameter("metaDataJSON",0) as boolean;
			} else {
				fillWithSpaces = this.getNodeParameter("fillSpaces",0) as boolean;
			}

			if( type === "json"){
				text += "[\n";
				for( var entry of data){
					if(metaDataJSON){
						text += JSON.stringify(entry) + ",\n";
					} else {
						text += JSON.stringify(entry.json) + ",\n";
					}
				}
				text += "]";
			} else {
				text += TableBuilder.ArrayToTable(data, fillWithSpaces);
			}
		}

		if(target === "frontend" || target === "both"){
			this.sendMessageToUI(text);
		}
		if(target === "backend" || target === "both"){
			console.log(text);
		}
		return [data];
	}

}
