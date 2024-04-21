import React from 'react';

const TableComponent = ({ data, columns }) => {
	if (!data || !data.length) {
		return null; // If data is not available, don't render anything
	}

	return (
		<div className="h-[45rem] overflow-auto">
			<h3 className="text-primary100 font-medium mb-6">Tabular View</h3>
			<table className="table w-full table-fixed border border-purple-8 !rounded-md">
				<thead>
					<tr className=" text-primary80">
						{columns?.map((column, index) => (
							<th key={index} className="px-4 py-2  font-semibold">
								{column.charAt(0).toUpperCase() + column.slice(1)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column, columnIndex) => (
								<td
									key={columnIndex}
									className="px-4 py-2 border-t border-purple-8 max-w-[100px] truncate text-primary80"
								>
									{row[column]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableComponent;
