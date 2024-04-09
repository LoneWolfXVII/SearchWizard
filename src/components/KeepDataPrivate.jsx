import { keepDataPrivate } from '../types/home.content';

const KeepDataPrivate = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className="tPro:order-2 order-1 tPro:col-span-1 col-span-2 mx-20">
						<img
							src="/assets/bgs/keep-data-private.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:order-1 order-2 tPro:col-span-1 col-span-2 flex flex-col items-center content my-auto justify-start lpro:px-10 tPro:mt-12 mt-10 tPro:mx-0 mx-10">
						<h2 className="w-full">
							Keep your Data
							<span className="block">Private</span>
						</h2>
						<p className="mt-8">{keepDataPrivate?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default KeepDataPrivate;
