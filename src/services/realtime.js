/* eslint-env browser */

// Helpers untuk cek ketersediaan API browser
const hasSSE = () => typeof window !== 'undefined' && typeof window.EventSource !== 'undefined';
const hasWS  = () => typeof window !== 'undefined' && typeof window.WebSocket !== 'undefined';

export function connectSSE(url, {onMessage, onError} = {}) {
	if (!hasSSE()) {
		console.warn('EventSource not available in this environment');
		// kembalikan cleanup no-op
		return () => {};
	}
	const es = new window.EventSource(url);
	if (onMessage) es.onmessage = (evt) => onMessage(evt.data);
	if (onError)  es.onerror    = onError;
	return () => es.close();
}

export function connectWebSocket(url, {onOpen, onMessage, onClose, onError} = {}) {
	if (!hasWS()) {
		console.warn('WebSocket not available in this environment');
		return null; // pastikan pemanggil cek null sebelum pakai
	}
	const ws = new window.WebSocket(url);
	if (onOpen)    ws.onopen    = onOpen;
	if (onMessage) ws.onmessage = (evt) => onMessage(evt.data);
	if (onClose)   ws.onclose   = onClose;
	if (onError)   ws.onerror   = onError;
	return ws;
}
