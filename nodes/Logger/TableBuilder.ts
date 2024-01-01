type JsonType = { [key: string]: any };

function limitString(str: string): string {
	const maxLength = 20;
	if( typeof str !=="string" ){
		return "".padEnd(maxLength,' ');
	}
	if (str.length > maxLength) {
			// Truncate and add "..."
			return str.substring(0, maxLength - 3) + "...";
	} else {
			// Pad with spaces
			return str.padEnd(maxLength, ' ');
	}
}

export class TableBuilder{

	static ArrayToTable(arr: Array<{ json: JsonType }>, fillSpaces : boolean): string {
		if (arr.length === 0) {
				return 'No data available';
		}

		// Extracting column headers (keys) from the first object
		const headers:string[] = [];
		for(var entry of arr){
			let row = Object.keys(entry.json);
			for( let cell of row){
				if( ! headers.includes(cell)){
					headers.push(cell);
				}
			}
		}

		// Creating the header row
		let table:any = [];
		if(fillSpaces){
		   table = "|" + headers.map(entry => limitString(entry)).join(' | ') + '|\n';
		} else {
			table = "|" + headers.map(entry => entry).join(' | ') + '|\n';
		}


		// Creating the separator
		if( fillSpaces){
			table += "|" + headers.map(() => '====================').join('|') + '|\n';
		} else {
			table += "|" + headers.map(() => '===').join('|') + '|\n';
		}

		// Iterating over each object to create rows
		arr.forEach((item, index) => {
			if(fillSpaces){
				const row = headers.map(header => {
					var entry = item.json[header];
					var text :string = "";
					if( typeof entry == 'string'){
						text = entry;
					} else if(entry == null) {
						text = "";
					} else {
						text = JSON.stringify(entry);
					}
					return limitString(text);

				 }).join(' | ');
				table += "|" + row + '|\n';
			} else {
				const row = headers.map(header => item.json[header] || '').join(' | ');
				table += "|" + row + '|\n';
			}
		});

		return table;
}

}
