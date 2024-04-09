import { learningAndEvolution } from '../types/home.content';

const LearningAndEvolution = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className="tPro:order-2 order-1 tPro:col-span-1 col-span-2 mx-10">
						<img
							src="/assets/bgs/learning-evolution.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:order-1 order-2 tPro:col-span-1 col-span-2 flex flex-col items-center content lpro:px-10 my-auto justify-start tPro:mt-12 mt-10 mx-10">
						<h2 className="w-full">
							Learning &amp;
							<span className="block">Evolution</span>
						</h2>
						<p className="mt-8">{learningAndEvolution?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LearningAndEvolution;
