import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import TableComponent from './TableComponent';

const GraphComponent = ({ data }) => {
	const [chart, setChart] = useState({
		xAxis: '',
		yAxis: '',
		type: '',
	});
	const [initialized, setInitialized] = useState(false);
	const [loadedData, setLoadedData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [activeTab, setActiveTab] = useState('Graphical View');

	const chartRef = useRef(null);

	useEffect(() => {
		if (data && data.response_csv_curl) {
			setChart({
				xAxis: data['x-axis'],
				yAxis: data['y-axis'],
				type: data['graph_type'],
			});
		}
	}, [data]);

	useEffect(() => {
		if (chart.type && chart.xAxis && chart.yAxis && data?.response_csv_curl) {
			d3.csv(data.response_csv_curl).then(makeChart);
		}
	}, [chart, data]);

	function makeChart(loadedData) {
		console.log('Loaded data:', loadedData);
		setLoadedData(loadedData);

		Object.keys(loadedData[0]).forEach((key) => {
			setColumns((prev) => {
				const uniqueKeys = new Set(prev);
				uniqueKeys.add(key);
				return [...uniqueKeys];
			});
		});

		// Empty lists for our data and labels
		const dataPoints = [];
		const labels = [];

		// Use a for-loop to load the data from the CSV file into our lists
		for (let i = 0; i < loadedData.length; i++) {
			// Get the x-axis and y-axis values for each entry
			const xAxisValue = loadedData[i][chart.xAxis];
			const yAxisValue = Number(loadedData[i][chart.yAxis]);

			// Add the x-axis value to our labels
			labels.push(xAxisValue);

			// Add the y-axis value to our data points
			dataPoints.push(yAxisValue);
		}

		console.log('Labels:', labels);
		console.log('Data points:', dataPoints);

		const options = {
			type: chart.type,
			data: {
				labels: labels, // The labels we loaded
				datasets: [
					{
						label: chart.yAxis, // Label for the y-axis data
						data: dataPoints, // The data points we loaded
						fill: false,
						borderColor: 'rgba(106, 18, 205, 0.04)',
					},
				],
			},
		};

		if (!initialized) {
			const ctx = document.getElementById('canvas');
			chartRef.current = new Chart(ctx, options);
			setInitialized(true);
		} else {
			chartRef.current.data = options.data;
			chartRef.current.update();
		}
	}

	return (
		<div className="mb-4">
			{/* <ul className="ghost-tabs relative col-span-12 mb-8 inline-flex w-full border-b border-black-10">
				{['Graphical View', 'Tabular View'].map((items, indx) => (
					<li
						key={indx}
						className={[
							'!pb-0',
							activeTab === items ? 'active-tab' : 'default-tab',
						].join(' ')}
						onClick={() => setActiveTab(items)}
					>
						{items}
					</li>
				))}
			</ul> */}
			<canvas id="canvas" width="380" height="250"></canvas>
		</div>
	);
};

export default GraphComponent;
