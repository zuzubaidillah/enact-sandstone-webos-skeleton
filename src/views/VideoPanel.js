
// src/views/VideoPanel.js (updated to use the .less styles)
import {useEffect, useRef, useCallback} from 'react';
import {Cell, Column, Row} from '@enact/ui/Layout';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
import BodyText from '@enact/sandstone/BodyText';
import $L from '@enact/i18n/$L';
import css from './VideoPanel.module.less';

export default function VideoPanel({onDone}) {
	const wrapperRef = useRef(null);
	const playerRef = useRef(null);
	const videoRef = useRef(null);
	const controlsIdRef = useRef(`mc-${Math.random().toString(36).slice(2, 10)}`);

	useEffect(() => {
		const node = wrapperRef.current?.querySelector('video');
		videoRef.current = node || null;
	}, []);

	useEffect(() => {
		const handler = (e) => {
			const vp = playerRef.current;
			const v = videoRef.current;
			if (!vp) return;

			switch (e.key) {
				case 'MediaPlayPause': {
					const paused = vp.getMediaState?.().paused;
					if (paused) vp.play(); else vp.pause();
					e.preventDefault();
					break;
				}
				case 'MediaPlay': vp.play(); e.preventDefault(); break;
				case 'MediaPause': vp.pause(); e.preventDefault(); break;
				case 'MediaStop': vp.pause(); if (v) v.currentTime = 0; e.preventDefault(); break;
				case 'MediaFastForward':
				case 'SeekForward':
					if (v) {
						const dur = Number.isFinite(v.duration) ? v.duration : Infinity;
						v.currentTime = Math.min(dur, v.currentTime + 10);
					}
					e.preventDefault();
					break;
				case 'MediaRewind':
				case 'SeekBackward':
					if (v) v.currentTime = Math.max(0, v.currentTime - 10);
					e.preventDefault();
					break;
				default:
					break;
			}
		};

		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, []);

	const handleTogglePlay = useCallback(() => {
		const vp = playerRef.current;
		if (!vp) return;
		const paused = vp.getMediaState?.().paused;
		if (paused) vp.play(); else vp.pause();
	}, []);

	const handleSeek = useCallback((deltaSeconds) => {
		const v = videoRef.current;
		if (!v) return;
		const dur = Number.isFinite(v.duration) ? v.duration : Infinity;
		const next = Math.min(dur, Math.max(0, v.currentTime + deltaSeconds));
		v.currentTime = next;
	}, []);

	const handleSeekBack = useCallback(() => { handleSeek(-10); }, [handleSeek]);
	const handleSeekForward = useCallback(() => { handleSeek(10); }, [handleSeek]);

	const handleDone = useCallback(() => {
		if (typeof onDone === 'function') onDone();
	}, [onDone]);

	return (
		<Column className={css.videoPanel} ref={wrapperRef}>
			<Cell>
				<div className={css.player}>
					<VideoPlayer ref={playerRef} title={$L('Sample Video')}>
						<source
							src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
							type="video/mp4"
						/>

						<MediaControls id={controlsIdRef.current}>
							<leftComponents>
								<Button backgroundOpacity="translucent" icon="star" />
							</leftComponents>
							<rightComponents>
								<Button backgroundOpacity="translucent" icon="search" />
							</rightComponents>
						</MediaControls>
					</VideoPlayer>
				</div>
			</Cell>

			<Cell>
				<Row className={css.actions}>
					<Button onClick={handleTogglePlay}>{$L('Play/Pause')}</Button>
					<Button onClick={handleSeekBack}>{$L('-10s')}</Button>
					<Button onClick={handleSeekForward}>{$L('+10s')}</Button>
					<Button onClick={handleDone}>{$L('Done')}</Button>
				</Row>
				<BodyText className={css.helper}>
					{$L('Use your remote’s media keys (Play/Pause, Stop, Rewind, FastForward).')}
				</BodyText>
			</Cell>
		</Column>
	);
}
