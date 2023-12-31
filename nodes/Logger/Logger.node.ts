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
		icon: 'file:logger.svg',
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
				displayName: 'Print DateTime',
				name: 'dateTime',
				placeholder: 'true',
				type: 'boolean',
				description: 'Whether a TimeStamp shall be logged',
				default: true,
			},
			{
				displayName: 'Print NodeName',
				name: 'nodeName',
				placeholder: 'true',
				type: 'boolean',
				description: 'Whether the node name shall be logged',
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
				displayName: 'Output Type',
				name: 'outputType',
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
		const printDateTime = this.getNodeParameter("dateTime",0) as boolean;
		const printNodeName = this.getNodeParameter("nodeName",0) as number;
		const description = this.getNodeParameter('description',0) as string;
		const type = this.getNodeParameter("outputType",0) as string;

		let metaDataJSON = false;
		let fillWithSpaces = false;

		if(type === 'json'){
			metaDataJSON = this.getNodeParameter("metaDataJSON",0) as boolean;
		} else {
			fillWithSpaces = this.getNodeParameter("fillSpaces",0) as boolean;
		}


		let data = this.getInputData();

		let text = "";

		if( printDateTime){
			text += new Date().toLocaleString() + " : \n";
		}

		if( printNodeName){
			text += this.getNode().name + " : \n";
		}

		if( description !== undefined){
			text += "Description: " + description +"\n";
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
		this.sendMessageToUI(text);
		console.log(text);

		return [data];
	}

}
