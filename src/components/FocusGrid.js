// src/components/FocusGrid.js (Sandstone version)
import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import ri from '@enact/ui/resolution';

const FocusGrid = kind({
	name: 'FocusGrid',
	defaultProps: {
		rows: 2,
		cols: 5
	},
	render: ({rows, cols, ...rest}) => {
		const items = Array.from({length: rows * cols}, (_, i) => ({
			key: i,
			caption: `Item ${i + 1}`
		}));

		// ukuran tile responsif (ri.scale) biar konsisten di FHD/4K
		const tileW = ri.scale(300);
		const gap = ri.scale(12);

		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${cols}, ${tileW}px)`,
					gap
				}}
				{...rest}
			>
				{items.map(({key, caption}) => (
					<ImageItem
						key={key}
						caption={caption}
						subCaption="Focusable"
						// placeholder sederhana; ganti dgn gambar asli jika ada
						src="https://dummyimage.com/480x270/202020/ffffff&text=%20"
						onClick={() => console.log('Selected', caption)}
					/>
				))}
			</div>
		);
	}
});

export default FocusGrid;
