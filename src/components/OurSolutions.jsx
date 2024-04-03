import { ourSolutions } from '../types/home.content';

const OurSolutions = () => {
	return (
		<div className="w-full our-solutions-bg-gradient lpro:mt-[10.625rem] mt-16">
			<img src="/assets/bgs/wave-top.svg" className="w-full h-auto" />
			<div className='my-container'>
				<div className="py-[5.188rem]">
					<h2 className="text-white text-center lpro:mb-16 mb-10">{ourSolutions?.heading}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
						{ourSolutions?.solutions.map((solution, index) => (
							<div key={index} className="flex items-start gap-4 ">
								<img
									src={solution.icon}
									className="w-10 h-10 "
								/>
								<div className="flex flex-col gap-4">
									<h3 className="text-[21px] leading-[32px] tracking-[-0.5px] font-bold text-white">
										{solution.heading}
									</h3>
									<p className="text-base leading-[29px] tracking-[-0.2px] font-light text-white/65">
										{solution.content}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<img src="/assets/bgs/wave-bottom.svg" className="w-full h-auto" />
		</div>
	);
};

export default OurSolutions;
