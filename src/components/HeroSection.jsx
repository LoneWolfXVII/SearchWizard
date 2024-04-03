import { useEffect, useState } from 'react';
import { heroSection, phrases } from '../types/home.content.js';

const HeroSection = ({ setOpen }) => {
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="hero-section lpro:py-4 lpro:h-screen lpro:pt-24 pt-14 lpro:px-0 px-6 pb-40">
			<div className=" lpro:h-[70%]">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className=" lpro:pl-[100px] lpro:col-span-1 col-span-2">
						<h1 className="lpro:mt-20 mt-14 lpro:text-[56px] lpro:leading-[68px] text-[32px] leading-10 font-bold text-text-01 phrase-animation">
							{heroSection?.heading1}
							<span className=" block text-text-02">
								{phrases[currentPhraseIndex]}
							</span>
						</h1>
						<p className=" lpro:max-w-[562px] lpro:text-2xl text-sm font-medium text-black/60 lpro:mt-10 mt-8">
							{heroSection?.subheading}
						</p>
						<button
							className="primary-button mt-10"
							onClick={() => setOpen(true)}
						>
							Join the waitlist
						</button>
					</div>
					<div className="lpro:col-span-1 col-span-2 pr-8 lpro:block hidden">
						<img
							src="/assets/bgs/hero-section.svg"
							className="w-full h-[630px] object-contain"
						/>
					</div>
				</div>
			</div>
			<img
				src="/assets/bgs/Wave.png"
				className="w-full h-auto lpro:block hidden"
			/>
		</section>
	);
};

export default HeroSection;
