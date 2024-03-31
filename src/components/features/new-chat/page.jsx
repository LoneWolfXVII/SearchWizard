import useLocalStorage from '@/hooks/useLocalStorage';
import { welcomeTypography } from './config';
import { useState } from 'react';
import ConnectDataSource from './ConnectDataSource';
import SelectPrompt from './SelectPromt';
import InputText from '@/components/elements/InputText';
import AnalysisData from './AnalysisData';

const NewChat = () => {
	const [value] = useLocalStorage('userDetails');
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState(0);
	const [showRenameDialog, setShowRenameDialog] = useState(false);

	const [completedSteps, setCompletedSteps] = useState([2]);

	const gradientText = {
		backgroundImage:
			'linear-gradient(270deg, rgba(106, 18, 205, 0.4), rgba(106, 18, 205, 0.8))',
		backgroundClip: 'text',
		WebkitBackgroundClip: 'text',
		color: 'transparent',
	};

	const showProgress = (itemCurrent) => {
		try {
			let tempCssClass = ``;
			if (completedSteps?.includes(itemCurrent)) {
				tempCssClass += `bg-purple-100 cursor-pointer`;
				return tempCssClass;
			} else {
				// if (
				//   itemCurrent?.key === step ||
				//   itemCurrent?.myStep === formProgressAndComponentMapping[step]
				// ) {
				//   tempCssClass += `bg-purple-16 cursor-pointer`;
				// } else if (itemCurrent?.myStep <= isStepCompleted?.current) {
				//   tempCssClass += `bg-purple-100 cursor-pointer`;
				// } else {
				//   tempCssClass += `bg-blue-16`;
				// }
				tempCssClass += `bg-purple-16`;
				return tempCssClass;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFileUpload = (files) => {
		// Simulating file upload with setTimeout
		setShowRenameDialog(true);
		let totalSize = 0;
		files.forEach((file) => {
			totalSize += file.size;
		});
		let uploadedSize = 0;
		files.forEach((file) => {
			setTimeout(() => {
				uploadedSize += file.size;
				const progressPercentage = (uploadedSize / totalSize) * 100;
				setProgress(parseInt(progressPercentage));
			}, 3000);
		});
	};

	const handleNextStep = (step) => {
		setCompletedSteps([...completedSteps, step]);
	};

	const renderComponent = () => {
		switch (completedSteps[completedSteps.length - 1]) {
			case 1:
				return (
					<ConnectDataSource
						files={files}
						setFiles={setFiles}
						progress={progress}
						handleFileUpload={handleFileUpload}
						handleNextStep={handleNextStep}
					/>
				);
			case 2:
				return <AnalysisData />;
			case 3:
				return <SelectPrompt />;
			default:
				return <div>Chat / Converse</div>;
		}
	};

	return (
		<div className="flex justify-center">
			<div className="flex flex-col items-center w-[51.875rem] relative">
				<div className="align-left w-full">
					<h1
						className="text-5xl font-semibold align-left"
						style={gradientText}
					>{`${welcomeTypography?.headingLine1} ${value.userName}`}</h1>
					<h1 className="text-5xl font-semibold text-purple-20">
						{welcomeTypography?.headingLine2}
					</h1>
					<ul className="relative mt-6 mb-3 inline-flex gap-2">
						{[1, 2, 3]?.map((items, indx) => {
							return (
								<>
									<li
										key={indx}
										className={[
											`h-2 w-14 rounded-3xl `,
											showProgress(items),
										].join(' ')}
										onClick={() => {}}
									></li>
								</>
							);
						})}
					</ul>
				</div>
				<div className="mt-[4.5rem] overflow-scroll w-full">
					{renderComponent()}
				</div>
				{completedSteps.includes(2) ? (
					<div className="fixed bottom-1 flex flex-col items-center justify-center !w-[51.875rem]">
						<div className="rounded-[100px] flex justify-between bg-purple-4 px-3 py-2 mb-2 w-full">
							<InputText
								placeholder="Enter a prompt here"
								inputMainClass="border-0 outline-none rounded-none bg-transparent !w-[46rem]"
							/>
							<div className="flex gap-2 items-center pr-3">
								<p>🌁</p>
								<p>🎤</p>
							</div>
						</div>
						<p className="text-xs text-primary40 font-normal">
							Irame.ai may display inaccurate info, including about
							people, so double-check its responses.
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default NewChat;
