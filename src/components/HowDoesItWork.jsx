import { howDoesItWork } from '../types/home.content';

const HowDoesItWork = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-12 lpro:gap-x-10 ">
					<div className="lpro:order-2 order-1 lpro:col-span-7 col-span-12">
						<img
							src="/assets/bgs/analytics-graph.svg"
							className=" w-full lpro:h-[380px] h-auto object-contain"
						/>
					</div>
					<div className="lpro:order-1 order-2 lpro:col-span-5 col-span-12 flex flex-col items-center lpor:px-10 my-auto justify-start lpro:mt-0 mt-10">
						<h2 className="w-full">How does it work?</h2>
						<p className="mt-8">{howDoesItWork?.content}</p>
					</div>
				</div>
				{/* <div className="my-14 border border-t-purple-20 border-l-0 border-b-0 border-r-0"></div> */}
				<div className="grid lpro:grid-cols-3 grid-cols-1 gap-x-8 border-t pt-14 mt-14 border-purple-20">
					{howDoesItWork?.steps.map((step, index) => (
						<div key={index} className="flex items-start gap-x-4 lpro:border-r lpro:border-b-0 border-b last:border-0 lpro:pr-8 lpro:py-0 py-8 first:pt-0 border-purple-20">
							<img
								src={step.icon}
								className=" w-9 h-9"
							/>
							<div className="flex flex-col gap-x-4">
								<h3 className="tracking-[-0.5px] text-typography text-xl leading-8 mb-2 font-bold">{step.heading}</h3>
								<p className="text-base font-normal text-typography-opacity-70">
									{step.content}
								</p>
							</div>
							{/* {step.divider ? (
								<div className="lpro:border-r border-b border-purple-20 h-[10.5rem]"></div>
							) : null} */}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowDoesItWork;
