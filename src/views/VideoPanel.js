import {useEffect, useRef, useState} from "react";

useEffect(() => {
	const node = hostRef.current?.querySelector("video");
	if (node) setVideoEl(node);
}, []);


useEffect(() => {
	const handler = (e) => {
		if (!videoEl) return;
		switch (e.key) {
			case "MediaPlayPause":
				videoEl.paused ? videoEl.play() : videoEl.pause();
				e.preventDefault();
				break;
			case "MediaPlay":
				videoEl.play();
				e.preventDefault();
				break;
			case "MediaPause":
				videoEl.pause();
				e.preventDefault();
				break;
			case "MediaStop":
				videoEl.pause();
				videoEl.currentTime = 0;
				e.preventDefault();
				break;
			case "MediaFastForward":
			case "SeekForward":
				videoEl.currentTime = Math.min(videoEl.duration || Infinity, videoEl.currentTime + 10);
				e.preventDefault();
				break;
			case "MediaRewind":
			case "SeekBackward":
				videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
				e.preventDefault();
				break;
			default:
				break;
		}
	};
	window.addEventListener("keydown", handler);
	return () => window.removeEventListener("keydown", handler);
}, [videoEl]);


return (
	<Column style={{gap: 16}} ref={hostRef}>
		<Cell>
			<VideoPlayer title={$L("Sample Video")}>
				<source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
								type="video/mp4"/>
				<MediaControls/>
			</VideoPlayer>
		</Cell>


		<Cell>
			<Row style={{gap: 12}}>
				<Button
					onClick={() => videoEl && (videoEl.paused ? videoEl.play() : videoEl.pause())}>{$L("Play/Pause")}</Button>
				<Button
					onClick={() => videoEl && (videoEl.currentTime = Math.max(0, videoEl.currentTime - 10))}>{$L("-10s")}</Button>
				<Button
					onClick={() => videoEl && (videoEl.currentTime = Math.min(videoEl.duration || Infinity, videoEl.currentTime + 10))}>{$L("+10s")}</Button>
				<Button onClick={onDone}>{$L("Done")}</Button>
			</Row>
			<BodyText style={{marginTop: 8}}>
				{$L("Use your remote’s media keys (Play/Pause, Stop, Rewind, FastForward).")}
			</BodyText>
		</Cell>
	</Column>
);
