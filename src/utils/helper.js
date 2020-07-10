
/**
 * Converts PublicKeyCredential into serialised JSON
 * @param  {Object} pubKeyCred
 * @return {Object}            - JSON encoded publicKeyCredential
 */
export const publicKeyCredentialToJSON = (pubKeyCred) => {
	if(pubKeyCred instanceof Array) {
		let arr = [];
		for(let i of pubKeyCred)
			arr.push(publicKeyCredentialToJSON(i));

		return arr
	}

	if(pubKeyCred instanceof ArrayBuffer) {
		// eslint-disable-next-line no-undef
		return window.base64url.encode(pubKeyCred)
	}

	if(pubKeyCred instanceof Object) {
		let obj = {};

		for (let key in pubKeyCred) {
			obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
		}

		return obj
	}

	return pubKeyCred
}

/**
 * Generate secure random buffer
 * @param  {Number} len - Length of the buffer (default 32 bytes)
 * @return {Uint8Array} - random string
 */
export const generateRandomBuffer = (len) => {
	len = len || 32;

	let randomBuffer = new Uint8Array(len);
	window.crypto.getRandomValues(randomBuffer);

	return randomBuffer
}

/**
 * Decodes arrayBuffer required fields.
 */
export const preformatMakeCredReq = (makeCredReq) => {
// eslint-disable-next-line no-undef
	makeCredReq.challenge = window.base64url.decode(makeCredReq.challenge);
// eslint-disable-next-line no-undef
	makeCredReq.user.id = window.base64url.decode(makeCredReq.user.id);

	return makeCredReq
}

/**
 * Decodes arrayBuffer required fields.
 */
export const preformatGetAssertReq = (getAssert) => {
	// eslint-disable-next-line no-undef
	getAssert.challenge = window.base64url.decode(getAssert.challenge);

	for(let allowCred of getAssert.allowCredentials) {
		// eslint-disable-next-line no-undef
		allowCred.id = window.base64url.decode(allowCred.id);
	}

	return getAssert
}

export const sendWebAuthnResponse = (body) => {
	return fetch('/api/response', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then((response) => response.json())
		.then((response) => {
			if(response.status != 0)
				throw new Error(`Server responed with error. The message is: ${response.message}`);
			return response
		})
}
