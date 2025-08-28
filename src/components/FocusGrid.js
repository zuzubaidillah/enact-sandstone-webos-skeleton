// src/components/FocusGrid.js — ESLint fix (react/jsx-no-bind)
import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import ri from '@enact/ui/resolution';

const FocusGrid = kind({
	name: 'FocusGrid',
	defaultProps: {
		rows: 2,
		cols: 5
	},
	render: ({rows, cols, onItemClick, ...rest}) => {
		const items = Array.from({length: rows * cols}, (_, i) => ({
			key: i,
			caption: `Item ${i + 1}`
		}));

		const tileW = ri.scale(300);
		const gap = ri.scale(12);

		// Handler tanpa arrow di JSX; diteruskan via props ke ImageItem
		const handleItemClick = (caption) => () => {
			// jika parent mengirim onItemClick, panggil itu; fallback ke console.log
			if (typeof onItemClick === 'function') onItemClick(caption);
			else console.log('Selected', caption);
		};

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
						src="https://dummyimage.com/480x270/202020/ffffff&text=%20"
						onClick={handleItemClick(caption)}
					/>
				))}
			</div>
		);
	}
});

export default FocusGrid;
