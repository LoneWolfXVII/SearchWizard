import { dashboardAndCustomization } from '../types/home.content';

const DashboardAndCustomization = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 tPro:gap-x-3 ">
					<div className="tPro:col-span-1 col-span-2 mx-10">
						<img
							src="/assets/bgs/customization.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:col-span-1 col-span-2 flex flex-col items-center lpro:px-10 my-auto justify-end tPro:mt-12 mt-10 tPro:mx-0 mx-10">
						<h2 className="w-full">Customization</h2>
						{/* {dashboardAndCustomization?.subheading ? (
							<h4 className="text-2xl font-semibold text-typography/70 mt-8">
								{dashboardAndCustomization?.subheading}
							</h4>
						) : null} */}
						<p className="mt-8">{dashboardAndCustomization?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardAndCustomization;
