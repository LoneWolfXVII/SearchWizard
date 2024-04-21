import React from 'react';
import LineChartComponent from './LineChart';

const GraphComponent = () => {
	const mock = [
		{
			title: 'Planner',
			data_format: 'text',
			display_format: 'text',
			workspace: 'main',
		},
		{
			title: 'Graph',
			data_format: 'json',
			display_format: 'graph',
			workspace: 'main',
		},
		{
			title: 'Coder',
			data_format: 'text',
			display_format: 'code',
			workspace: 'secondary',
		},
		{
			title: 'Any Tool',
			data_format: 'text',
			display_format: 'text',
			workspace: 'secondary',
		},
	];
	return (
		<div>
			<LineChartComponent height="20rem" data={mock} />
		</div>
	);
};

export default GraphComponent;
