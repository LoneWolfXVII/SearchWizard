import { Button } from '@/components/ui/button';
import UploadInput from './UploadInput';
import { welcomeTypography } from './config';
import { Switch } from '@/components/ui/switch';
import PropTypes from 'prop-types';

const ConnectDataSource = ({
	handleFileUpload,
	files,
	setFiles,
	progress,
	handleNextStep,
}) => {
	return (
		<div className="flex flex-col gap-4">
			<UploadInput
				onFileUpload={handleFileUpload}
				files={files}
				setFiles={setFiles}
				progress={progress}
			/>
			<div className="flex justify-between">
				<span className="bg-purple-4 rounded-[100px] py-3 px-5 flex items-center gap-2 max-w-[13.2rem]">
					<p className="text-purpleDark text-sm">
						{welcomeTypography?.demoDataLabel}
					</p>
					<Switch className="h-5 w-9" />
				</span>
				{files.length > 0 && progress === 100.0 ? (
					<Button
						onClick={() => handleNextStep(2)}
						className="rounded-[100px] h-11 hover:text-white hover:bg-purple100 hover:opacity-90 light"
					>
						Continue
					</Button>
				) : null}
			</div>
			<div className="light"></div>
		</div>
	);
};

export default ConnectDataSource;

ConnectDataSource.propTypes = {
	handleFileUpload: PropTypes.func.isRequired,
	files: PropTypes.array.isRequired,
	setFiles: PropTypes.func.isRequired,
	progress: PropTypes.number.isRequired,
	handleNextStep: PropTypes.func.isRequired,
};
