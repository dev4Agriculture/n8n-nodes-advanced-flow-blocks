import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

interface LooseObject {
	[key: string]: any
}

export class CredentialReader implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CredentialReader',
		name: 'credentials',
		icon: 'file:CredentialReader.svg',
		group: ['route'],
		version: 1,
		description:
			'Output JWT from Credentials to decode it',
		defaults: {
			name: 'CredentialReader'
			},
		inputs: ['main'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main'],
		outputNames: ['jwt'],
		properties: [{
			displayName: 'Credential Type',
			name: 'nodeCredentialType',
			type: 'credentialsSelect',
			noDataExpression: true,
			required: true,
			default: '',
			credentialTypes: ['extends:oAuth2Api', 'extends:oAuth1Api', 'has:authenticate']
		}
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let result: INodeExecutionData[] = [];
		let credentials :LooseObject = {};
		try {
			credentials.httpBasicAuth = await this.getCredentials('httpBasicAuth');
		} catch {}
		try {
			credentials.httpDigestAuth = await this.getCredentials('httpDigestAuth');
		} catch {}
		try {
			credentials.httpHeaderAuth = await this.getCredentials('httpHeaderAuth');
		} catch {}
		try {
			credentials.httpQueryAuth = await this.getCredentials('httpQueryAuth');
		} catch {}
		try {
			credentials.httpCustomAuth = await this.getCredentials('httpCustomAuth');
		} catch {}
		try {
			credentials.oAuth1Api = await this.getCredentials('oAuth1Api');
		} catch {}
		try {
			credentials.	oAuth2Api = await this.getCredentials('oAuth2Api');
		} catch {}
		try {
			credentials.nodeCredentialType = this.getNodeParameter('nodeCredentialType', 0);
		} catch {}

		try{
			credentials.microsoft = await this.getCredentials(credentials.nodeCredentialType);
		} catch{}

		result.push({json:{result:JSON.stringify(credentials)}});
		return [result];
	}

}
