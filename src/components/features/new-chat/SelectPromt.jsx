/**@format */
import { useEffect, useState } from 'react';
import { tabDetails } from './config';
import { fetchSuggestions } from './service/new-chat.service';
import { useRouter } from '@/hooks/useRouter';
import { tokenCookie } from '@/lib/utils';

const SelectPrompt = ({ handleNextStep, prompt, setPrompt }) => {
	const [activeTab, setActiveTab] = useState('descriptive');
	const [suggestions, setSuggestions] = useState([]);
	const { query } = useRouter();

	const handleActiveTab = (selectedTab) => {
		setActiveTab(selectedTab);
	};

	useEffect(() => {
		const token = tokenCookie;
		if (token && query.dataSourceId) {
			fetchSuggestions(query.dataSourceId, token).then((resp) => {
				console.log(resp);
			});
		}
	}, [query.dataSourceId]);
	return (
		<div className="">
			<ul className="flex gap-2 items-center">
				{tabDetails?.tabs?.map((element, indx) => {
					return (
						<li
							key={`tabs:${indx}`}
							className={`${
								element?.key === activeTab
									? ' text-purple-100 border-purple-40 tabActiveBg'
									: 'text-black/60 border-black/10'
							} text-sm font-medium border rounded-3xl px-3 py-2 cursor-pointer`}
							onClick={() => handleActiveTab(element?.key)}
						>
							<div className="">{element?.text}</div>
						</li>
					);
				})}
			</ul>
			<div className="mt-8">
				<div className="w-full overflow-x-auto flex gap-4">
					{[...Array(5)].map((_, index) => (
						<div
							className="bg-purple-4 rounded-xl min-w-[11.25rem] max-w-[19.25rem] max-h-[21.75rem] p-4 hover:bg-purple-8 mb-3"
							key={index}
						>
							<div
								className="overflow-y-auto text-base font-medium text-primary80 "
								onClick={() => handleNextStep(4)}
							>
								<ul className="divide-y-[24px] divide-transparent">
									<li className="flex items-center gap-2 hover:cursor-pointer hover:text-purple-80">
										Suggest beautiful places to see on an
										upcoming long road trip
									</li>
								</ul>
							</div>
							<div
								className=" text-right mt-6 cursor-pointer"
								onClick={() => setPrompt('niscahkl')}
							>
								<i className="bi-pencil-square text-primary100 bg-white py-1.5 px-2 rounded-full "></i>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SelectPrompt;
