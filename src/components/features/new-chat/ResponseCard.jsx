import GraphComponent from '@/components/elements/GraphComponent';
import React from 'react';

const ResponseCard = ({ answerResp }) => {
	const mainItems = Object.entries(answerResp).filter(
		([key, value]) => value.workspace === 'main',
	);

	return (
		<div className="mt-4 ml-12">
			{mainItems.map(([key, value]) => (
				<div key={key} className="mb-4">
					{value.display_format === 'text' &&
						value.data_format === 'text' && (
							<div>
								<h3 className="text-primary100">{key}</h3>
								<div className="text-primary80">
									{value.display_format}
								</div>
								<p className="text-primary80">{value.data_format}</p>
							</div>
						)}
					{value.display_format === 'graph' && (
						<div>
							<h3 className="text-primary100">{key}</h3>
							<GraphComponent data={value.data} />
						</div>
					)}
					{value.display_format === 'coder' && (
						<div>
							<h3 className="text-primary100">{key}</h3>
							<GraphComponent data={value.data} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default ResponseCard;
