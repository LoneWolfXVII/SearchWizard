import { automatedAnomalyDetection } from '../types/home.content';

const AutomatedAnomalyDetection = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 lpro:gap-x-3 ">
					<div className="lpro:col-span-1 col-span-2">
						<img
							src="/assets/bgs/automated-anomaly.svg"
							className=" w-full lpro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="lpro:col-span-1 col-span-2 flex flex-col items-center content my-auto justify-start lpro:mt-0 mt-10">
						<h2 className="w-full">
							Automated Anomaly{' '}
							<span className="block">Detection Alerts</span>
							{/* {automatedAnomalyDetection?.heading} */}
						</h2>
						<p className="mt-8">{automatedAnomalyDetection?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AutomatedAnomalyDetection;
