import { adaptiveWorkspace } from '../types/home.content';

const AdaptiveWorkspace = () => {
	return (
		<section className="mt-32">
			<div className="my-container">
				<div className="grid grid-cols-2 gap-x-3 ">
					<div className="tPro:col-span-1 col-span-2 mx-10">
						<img
							src="/assets/bgs/adaptive-workspace.svg"
							className=" w-full tPro:h-[500px]  h-auto object-contain"
						/>
					</div>
					<div className="tPro:col-span-1 col-span-2 flex flex-col items-center lpro:px-10 my-auto justify-end tPro:mt-20 mt-10 mx-10">
						<h2 className="w-full">Adaptive Workspace</h2>
						<p className="mt-8">{adaptiveWorkspace?.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AdaptiveWorkspace;
