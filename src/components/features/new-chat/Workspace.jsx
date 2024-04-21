import { useMemo } from 'react';
import PlannerComponent from './PlannerComponent';
import SourceComponent from './SourceComponent';
import CoderComponent from './CoderComponent';
import { WorkspaceEnum, workSpaceMap } from './types/new-chat.enum';
import GraphComponent from '@/components/elements/GraphComponent';

const Workspace = ({ handleTabClick, workSpaceTab, answerResp }) => {
	const renderedComponent = useMemo(() => {
		switch (workSpaceTab) {
			case WorkspaceEnum.Planner:
				return <PlannerComponent />;
			case WorkspaceEnum.Coder:
				return <CoderComponent />;
			case WorkspaceEnum.Graph:
				return <GraphComponent />;
			case WorkspaceEnum.Source:
			case WorkspaceEnum.any_tool:
				return <SourceComponent />;
			default:
				return null;
		}
	}, [workSpaceTab]);
	return (
		<div className="border rounded-2xl p-4 mt-6">
			<ul className="sixty-tabs relative col-span-12 mb-8 inline-flex w-full border-b border-black-10">
				{Object.keys(answerResp)
					?.filter((key) => answerResp[key]?.workspace === 'secondary')
					.map((items, indx) => (
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
							{workSpaceMap[items]}
						</li>
					))}
			</ul>
			{renderedComponent}
		</div>
	);
};

export default Workspace;
