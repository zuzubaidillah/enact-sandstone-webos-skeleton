// Simple helpers for SSE (EventSource) and WebSocket connections


export function connectSSE(url, {onMessage, onError} = {}) {
	const es = new EventSource(url);
	if (onMessage) es.onmessage = (evt) => onMessage(evt.data);
	if (onError) es.onerror = onError;
	return () => es.close();
}


export function connectWebSocket(url, {onOpen, onMessage, onClose, onError} = {}) {
	const ws = new WebSocket(url);
	if (onOpen) ws.onopen = onOpen;
	if (onMessage) ws.onmessage = (evt) => onMessage(evt.data);
	if (onClose) ws.onclose = onClose;
	if (onError) ws.onerror = onError;
	return ws;
}
