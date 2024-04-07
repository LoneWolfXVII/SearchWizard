import { smartDataExploration } from '../types/home.content';

const SmartDataExploration = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className="tPro:col-span-1 col-span-2">
						<img
							src="/assets/bgs/group-collage.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:col-span-1 col-span-2 flex flex-col items-center content my-auto justify-start">
						<h2 className="w-full">
							Smart Data <span className="block">Exploration</span>
							{/* {smartDataExploration?.heading} */}
						</h2>
						<p className="mt-8">{smartDataExploration?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SmartDataExploration;
