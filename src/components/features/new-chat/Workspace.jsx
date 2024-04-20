import { useMemo } from 'react';
import PlannerComponent from './PlannerComponent';
import GraphComponent from './GraphComponent';
import SourceComponent from './SourceComponent';
import CoderComponent from './CoderComponent';

const Workspace = ({ handleTabClick, workSpaceTab }) => {
	const renderedComponent = useMemo(() => {
		switch (workSpaceTab) {
			case 'Planner':
				return <PlannerComponent />;
			case 'Coder':
				return <CoderComponent />;
			case 'Graph':
				return <GraphComponent />;
			case 'Source':
				return <SourceComponent />;
			default:
				return null;
		}
	}, [workSpaceTab]);
	return (
		<div className="border rounded-2xl p-4 mt-6">
			<ul className="sixty-tabs relative col-span-12 mb-8 inline-flex w-full border-b border-black-10">
				{['Planner', 'Coder', 'Graph', 'Source']?.map((items, indx) => {
					return (
						<li
							key={indx}
							className={[
								'!pb-0',
								workSpaceTab === items
									? 'active-tab'
									: 'default-tab',
							].join(' ')}
							onClick={() => handleTabClick(items)}
						>
							{items}
						</li>
					);
				})}
			</ul>
			{renderedComponent}
		</div>
	);
};

export default Workspace;
