import GraphComponent from '@/components/elements/GraphComponent';
import React from 'react';
import CoderComponent from './CoderComponent';
import { WorkspaceEnum } from './types/new-chat.enum';

const ResponseCard = ({ answerResp }) => {
	const mainItems = Object.entries(answerResp?.answer).filter(
		([key, value]) => value.tool_space === 'main',
	);

	return (
		<div className="my-4 ml-12">
			{mainItems.map(([key, value]) => (
				<div key={key} className="mb-4 ">
					{(value.tool_type === 'text' ||
						value.tool_type === WorkspaceEnum.Planner) && (
						<div className="my-4">
							<h3 className="text-primary100 font-medium">
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</h3>
							<p className="text-primary80">{value.tool_data}</p>
						</div>
					)}
					{value.tool_type === WorkspaceEnum?.Graph && (
						<div className="my-4">
							<h3 className="text-primary100 font-medium max-w-full overflow-x-auto">
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</h3>
							<GraphComponent data={value.tool_data} />
						</div>
					)}
					{value.tool_type === WorkspaceEnum?.Coder && (
						<div className="my-4">
							<h3 className="text-primary100">{key}</h3>
							<CoderComponent data={value.tool_data} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default ResponseCard;
