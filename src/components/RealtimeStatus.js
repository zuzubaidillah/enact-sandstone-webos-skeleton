// src/components/RealtimeStatus.js — ESLint fix (react/jsx-no-bind) + correct default imports
import {useEffect, useRef, useState, useCallback} from 'react';
import Button from '@enact/sandstone/Button';
import BodyText from '@enact/sandstone/BodyText';
import {Row, Column, Cell} from '@enact/ui/Layout';
import {connectSSE, connectWebSocket} from '../services/realtime';
import $L from '@enact/i18n/$L';

const SSE_URL = 'https://example.com/events';
const WS_URL = 'wss://example.com/ws';

export default function RealtimeStatus(){
	const [status, setStatus] = useState('disconnected');
	const [lastMsg, setLastMsg] = useState('-');
	const wsRef = useRef(null);
	const sseCleanup = useRef(null);

	useEffect(() => () => {
		if (sseCleanup.current) sseCleanup.current();
		if (wsRef.current) wsRef.current.close();
	}, []);

	const handleConnect = useCallback(() => {
		setStatus('connecting');

		sseCleanup.current = connectSSE(SSE_URL, {
			onMessage: (data) => setLastMsg(`[SSE] ${data}`),
			onError: () => setStatus('disconnected')
		});

		wsRef.current = connectWebSocket(WS_URL, {
			onOpen: () => setStatus('connected'),
			onMessage: (data) => setLastMsg(`[WS] ${data}`),
			onClose: () => setStatus('disconnected'),
			onError: () => setStatus('disconnected')
		});
	}, []);

	const handleDisconnect = useCallback(() => {
		if (sseCleanup.current) { sseCleanup.current(); sseCleanup.current = null; }
		if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
		setStatus('disconnected');
	}, []);

	const handleSendPing = useCallback(() => {
		const ws = wsRef.current;
		if (ws && ws.readyState === 1) ws.send('ping');
	}, []);

	return (
		<Column style={{gap: 8}}>
			<Cell>
				<Row style={{gap: 12}}>
					<Button onClick={handleConnect}>{$L('Connect')}</Button>
					<Button onClick={handleDisconnect}>{$L('Disconnect')}</Button>
					<Button onClick={handleSendPing}>{$L('Send Ping')}</Button>
				</Row>
			</Cell>
			<Cell>
				<BodyText>
					{(status === 'connected') ? $L('Connected') : $L('Disconnected')}
				</BodyText>
				<BodyText>
					{$L('Last message')}: {lastMsg}
				</BodyText>
			</Cell>
		</Column>
	);
}
