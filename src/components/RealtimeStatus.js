import {useEffect, useRef, useState} from "react";
import {Button} from "@enact/sandstone/Button";
import {BodyText} from "@enact/sandstone/BodyText";
import {Row, Column, Cell} from "@enact/ui/Layout";
import {connectSSE, connectWebSocket} from "../services/realtime";
import $L from "@enact/i18n/$L";


const SSE_URL = "https://example.com/events";
const WS_URL = "wss://example.com/ws";


export default function RealtimeStatus() {
	const [status, setStatus] = useState("disconnected");
	const [lastMsg, setLastMsg] = useState("-");
	const wsRef = useRef(null);
	const sseCleanup = useRef(null);


	useEffect(() => () => {
		if (sseCleanup.current) sseCleanup.current();
		if (wsRef.current) wsRef.current.close();
	}, []);


	const connect = () => {
		setStatus("connecting");
		sseCleanup.current = connectSSE(SSE_URL, {
			onMessage: (data) => setLastMsg(`[SSE] ${data}`),
			onError: () => setStatus("disconnected")
		});
		wsRef.current = connectWebSocket(WS_URL, {
			onOpen: () => setStatus("connected"),
			onMessage: (data) => setLastMsg(`[WS] ${data}`),
			onClose: () => setStatus("disconnected"),
			onError: () => setStatus("disconnected")
		});
	};


	const disconnect = () => {
		if (sseCleanup.current) {
			sseCleanup.current();
			sseCleanup.current = null;
		}
		if (wsRef.current) {
			wsRef.current.close();
			wsRef.current = null;
		}
		setStatus("disconnected");
	};


	const sendPing = () => {
		if (wsRef.current && wsRef.current.readyState === 1) wsRef.current.send("ping");
	};


	return (
		<Column style={{gap: 8}}>
			<Cell>
				<Row style={{gap: 12}}>
					<Button onClick={connect}>{$L("Connect")}</Button>
					<Button onClick={disconnect}>{$L("Disconnect")}</Button>
					<Button onClick={sendPing}>{$L("Send Ping")}</Button>
				</Row>
			</Cell>
			<Cell>
				<BodyText>
					{(status === "connected") ? $L("Connected") : $L("Disconnected")}
				</BodyText>
				<BodyText>
					{$L("Last message")}: {lastMsg}
				</BodyText>
			</Cell>
		</Column>
	);
}
