import { interactiveAnalysis } from '../types/home.content';

const DeepDive = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className="lpro:order-2 order-1 lpro:col-span-1 col-span-2">
						<img
							src="/assets/bgs/interactive-analysis.svg"
							className=" w-full lpro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="lpro:order-2 order-2 lpro:col-span-1 col-span-2 flex flex-col items-center content my-auto justify-start">
						<h2 className="w-full">
							Interactive Deep Dive
							<span className="block">Analysis</span>
						</h2>
						<p className="mt-8">{interactiveAnalysis?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DeepDive;
