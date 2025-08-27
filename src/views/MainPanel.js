import {useCallback, useState} from "react";
import {Button} from "@enact/sandstone/Button";
import {Heading} from "@enact/sandstone/Heading";
import {BodyText} from "@enact/sandstone/BodyText";
import KeyGuide from "@enact/sandstone/KeyGuide";
import {Row, Column, Cell} from "@enact/ui/Layout";
import FocusGrid from "../components/FocusGrid";
import SystemInfoCard from "../components/SystemInfoCard";
import RealtimeStatus from "../components/RealtimeStatus";
import $L from "@enact/i18n/$L";


export default function MainPanel({onOpenSettings, onOpenVideo}) {
	const [count, setCount] = useState(0);

	// === handlers (menghindari react/jsx-no-bind) ===
	const handleDec = useCallback(() => {
		setCount(c => c - 1);
	}, []);

	const handleInc = useCallback(() => {
		setCount(c => c + 1);
	}, []);

	const handleReset = useCallback(() => {
		setCount(0);
	}, []);

	return (
		<Column style={{gap: "24px"}}>
			<Cell>
				<Heading showLine>{$L("Welcome")}</Heading>
				<BodyText>
					{$L("A minimal Enact app demonstrating Spotlight focus, LS2 calls, i18n, and real-time updates.")}
				</BodyText>
				<Row style={{gap: 12, marginTop: 12}}>
					<Button onClick={onOpenSettings}>{$L("Open Settings")}</Button>
					<Button onClick={onOpenVideo}>{$L("Open Video")}</Button>
				</Row>
			</Cell>


			<Cell>
				<Row style={{gap: "24px"}}>
					<Cell size="40%"><SystemInfoCard/></Cell>
					<Cell>
						<Heading showLine>{$L("Counter")}</Heading>
						<BodyText>{$L("Use LEFT/RIGHT to focus buttons, ENTER to activate.")}</BodyText>
						<Row style={{gap: "12px", marginTop: "12px"}}>
							<Button onClick={handleDec}>-1</Button>
							<Button onClick={handleInc}>+1</Button>
							<Button onClick={handleReset}>{$L("Reset")}</Button>
						</Row>
						<Heading spacing="small">
							{$L("Value")}: {count}
						</Heading>
					</Cell>
				</Row>
			</Cell>


			<Cell>
				<Heading showLine>{$L("Focus Grid (Spotlight)")}</Heading>
				<BodyText>
					{$L("Navigate with remote arrows (5‑way). Items are Spottable.")}
				</BodyText>
				<FocusGrid rows={2} cols={5}/>
			</Cell>


			<Cell>
				<Heading showLine>{$L("Live Status")}</Heading>
				<RealtimeStatus/>
			</Cell>


			<Cell>
				<KeyGuide>
					<KeyGuide.Item key="left">{$L("Move Left")}</KeyGuide.Item>
					<KeyGuide.Item key="right">{$L("Move Right")}</KeyGuide.Item>
					<KeyGuide.Item key="up">{$L("Move Up")}</KeyGuide.Item>
					<KeyGuide.Item key="down">{$L("Move Down")}</KeyGuide.Item>
					<KeyGuide.Item key="enter">{$L("Select")}</KeyGuide.Item>
					<KeyGuide.Item key="back">{$L("Back")}</KeyGuide.Item>
				</KeyGuide>
			</Cell>
		</Column>
	);
}
