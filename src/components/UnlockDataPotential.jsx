import { unlockDataPotential } from '../types/home.content';

const UnlockDataPotential = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className="tPro:col-span-1 col-span-2 lpro:mx-0 mx-10">
						<img
							src="/assets/bgs/unlock-data-potential.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:col-span-1 col-span-2 flex flex-col items-center content my-auto justify-start lpro:px-10 tPro:mt-12 mt-10 mx-10">
						<h2 className="w-full">
							Unlock Your Data&apos;s{' '}
							<span className="block">Potential</span>
						</h2>
						{unlockDataPotential?.subheading ? (
							<h4 className="text-2xl font-semibold text-typography/70 mt-8">
								{unlockDataPotential?.subheading}
							</h4>
						) : null}
						<p className="mt-4">{unlockDataPotential?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UnlockDataPotential;
