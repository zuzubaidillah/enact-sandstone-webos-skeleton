import {useEffect, useState} from "react";
import platform from "@enact/webos/platform";
import {Card, CardHeader, CardContent} from "@enact/sandstone/Card";
import {BodyText} from "@enact/sandstone/BodyText";
import {callLS2} from "../services/system";
import $L from "@enact/i18n/$L";


export default function SystemInfoCard() {
	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);


	useEffect(() => {
		let mounted = true;
		const fetch = async () => {
			if (!platform.webos) {
				setError($L("Not running on webOS (mocking example)."));
				return;
			}
			try {
				const res = await callLS2("luna://com.webos.service.systemservice", "getSystemInfo");
				if (mounted) setInfo(res);
			} catch (e) {
				if (mounted) setError(e?.message || "LS2 error");
			}
		};
		fetch();
		return () => {
			mounted = false;
		};
	}, []);


	return (
		<Card>
			<CardHeader title={$L("System Info (LS2)")}/>
			<CardContent>
				{error && <BodyText>{error}</BodyText>}
				{!error && !info && <BodyText>{$L("Loading...")}</BodyText>}
				{info && (
					<div style={{display: "grid", gap: 8}}>
						<BodyText>{$L("Model")}: {info.modelName}</BodyText>
						<BodyText>{$L("OS Version")}: {info.version}</BodyText>
						<BodyText>SDK: {info.sdkVersion}</BodyText>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
