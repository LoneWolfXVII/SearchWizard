import { useEffect, useState } from 'react';
import { heroSection, phrases } from '../types/home.content.js';

const HeroSection = ({ setOpen }) => {
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

	const handleOpen = (e) => {
		e.stopPropagation();
		setOpen(true);
	};
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="hero-section tPro:py-4 tPro:h-screen tPro:pt-24 pt-14 tPro:px-0 px-6 pb-40">
			<div className=" tPro:h-[70%]">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className=" tPro:pl-[100px] tPro:col-span-1 col-span-2">
						<h1 className="tPro:mt-20 mt-14 tPro:text-[56px] tPro:leading-[68px] text-[32px] leading-10 font-bold text-text-01">
							{heroSection?.heading1}
							<div className="animated-text block">
								<div className={`text-text-02 phrase `}>
									{phrases[currentPhraseIndex]}
								</div>
							</div>
						</h1>
						<p className=" tPro:max-w-[562px] tPro:text-2xl text-sm font-medium text-black/60 tPro:mt-10 mt-8">
							{heroSection?.subheading}
						</p>
						<button
							className="primary-button mt-10 z-[5]"
							onClick={(e) => handleOpen(e)}
						>
							Join the waitlist
						</button>
					</div>
					<div className="tPro:col-span-1 col-span-2 pr-8 tPro:block hidden">
						<img
							src="/assets/bgs/hero-section.svg"
							className="w-full h-[630px] object-contain"
						/>
					</div>
				</div>
			</div>
			{/* <img
				src="/assets/bgs/Wave.png"
				className="w-full h-auto tPro:block hidden"
			/> */}
		</section>
	);
};

export default HeroSection;
