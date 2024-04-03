import { selfCorrectingIntelligence } from '../types/home.content';

const SelfCorrectingIntelligence = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 tPro:gap-x-3 ">
					<div className="tPro:order-2 order-1 tPro:col-span-1 col-span-2">
						<img
							src="/assets/bgs/automated-anomaly.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:order-1 order-2 tPro:col-span-1 col-span-2 flex flex-col items-center lpor:px-10 my-auto justify-start tPro:mt-0 mt-10">
						<h2 className="w-full">
							Self-Correcting
							<span className="block">Intelligence</span>
						</h2>
						<p className="mt-8">{selfCorrectingIntelligence?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SelfCorrectingIntelligence;
