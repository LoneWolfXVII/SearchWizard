import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

const GraphComponent = ({ data }) => {
	const [chart, setChart] = useState({
		xAxis: '',
		yAxis: '',
		type: '',
	});
	const chartRef = useRef(null);

	useEffect(() => {
		if (data && data.response_csv_curl) {
			setChart({
				xAxis: data['x-axis'],
				yAxis: data['y-axis'],
				type: data['graph_type'],
			});
		}
	}, []);

	useEffect(() => {
		if (chart.type && chart.xAxis && chart.yAxis && data?.response_csv_curl) {
			d3.csv(data.response_csv_curl).then(makeChart);
		}
	}, [chart]);

	function makeChart(loadedData) {
		console.log('Loaded data:', loadedData);

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

		if (chartRef.current) {
			chartRef.current.destroy(); // Destroy existing chart instance
		}
		const ctx = document.getElementById('canvas');
		chartRef.current = new Chart(ctx, options);
	}

	return (
		<div className="mb-4">
			<canvas id="canvas" width="400" height="400"></canvas>
		</div>
	);
};

export default GraphComponent;
