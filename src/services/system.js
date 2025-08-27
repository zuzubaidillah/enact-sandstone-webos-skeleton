import LS2Request from "@enact/webos/LS2Request";

export function callLS2(service, method, parameters = {}) {
	return new Promise((resolve, reject) => {
		const bridge = new LS2Request();
		bridge.send({
			service,
			method,
			parameters,
			onSuccess: resolve,
			onFailure: (err) => reject(new Error(err?.errorText || "Unknown LS2 error"))
		});
	});
}
