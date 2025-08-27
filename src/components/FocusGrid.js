import kind from "@enact/core/kind";
import Spottable from "@enact/spotlight/Spottable";
import {GridListImageItem} from "@enact/sandstone/GridListImageItem";
import {FlexGrid} from "@enact/sandstone/FlexGrid";


const SpotItem = Spottable((props) => (
	<GridListImageItem
		caption={props.caption}
		subCaption="Focusable"
		onClick={props.onClick}
		style={{width: 300}}
	/>
));


const FocusGrid = kind({
	name: "FocusGrid",
	propTypes: {},
	defaultProps: {
		rows: 2,
		cols: 5
	},
	render: ({rows, cols, ...rest}) => {
		const items = Array.from({length: rows * cols}, (_, i) => ({
			key: i,
			caption: `Item ${i + 1}`
		}));


		return (
			<FlexGrid
				direction="row"
				wrap
				spacing={12}
				{...rest}
			>
				{items.map(({key, caption}) => (
					<SpotItem
						key={key}
						caption={caption}
						onClick={() => console.log("Selected", caption)}
					/>
				))}
			</FlexGrid>
		);
	}
});


export default FocusGrid;
