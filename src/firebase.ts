import * as Utils from './utils';
import * as fetch from 'node-fetch';
import * as config from './configFirebase.json';

const RTDB_AUTH_TOKEN = config.RTDB_AUTH_TOKEN;
const RTDB_URL = config.RTDB_URL;


export const getDbData = async(path: string): Promise<any> => {
	const response = await fetch.default(RTDB_URL + '/' + path + '.json?auth=' + RTDB_AUTH_TOKEN);

	const responseData = await Utils.gatherResponse(response);
	return responseData;
};

export const getDbDataWithFilter = async (path: string, key: string, value: string): Promise<any> => {
	const response = await fetch.default(`${RTDB_URL}/${path}.json?orderBy="${key}"&equalTo="${value}"&auth=${RTDB_AUTH_TOKEN}`);

	const responseData = await Utils.gatherResponse(response);
	return responseData;
};


export const putDbData = async (path: string, data: any | string): Promise<void> => {
	const options = {
		method: 'PUT',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(data)
	};

	await fetch.default(RTDB_URL + '/' + path + '.json?auth=' + RTDB_AUTH_TOKEN, options);
};

export const postDbData = async (path: string, data: any | string): Promise<any> => {
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(data)
	};

	const response = await fetch.default(RTDB_URL + '/' + path + '.json?auth=' + RTDB_AUTH_TOKEN, options);

	const responseData = await Utils.gatherResponse(response);
	return responseData;
};

