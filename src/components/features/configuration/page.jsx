import InputText from '@/components/elements/InputText';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { formatFileSize, getToken, tokenCookie } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import excel from '@/assets/icons/ms_excel.svg';
import { Button } from '@/components/ui/button';
import { getDataSources, uploadFile } from './service/configuration.service';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

const Configuration = () => {
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState(0);
	const [datasourceName, setDatasourceName] = useState('');
	const [formErrors, setFormErrors] = useState({});
	const [dataSources, setDataSources] = useState([]);
	const [showNoUpload, setShowNoUpload] = useState(false);

	const inputRef = useRef();

	const handleRemoveFile = (e, file, idx) => {
		e.preventDefault();
		e.stopPropagation();
		let tempArr = [...files];
		tempArr.splice(idx, 1);
		setFiles(tempArr);
		setShowNoUpload(false);
	};

	const handleFileChange = (e) => {
		try {
			if (!datasourceName) {
				setFormErrors((prev) => ({
					...prev,
					datasourceName: 'Please enter a name for your datasource',
				}));
				return;
			}

			if (!e.target.files.length) return;
			const selectedFiles = Array.from(e.target.files);
			setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
		} catch (error) {
			console.log(error);
		}
	};

	const uploadFileHelper = async () => {
		try {
			const response = await uploadFile(files, setProgress);
			if (response) {
				toast.success('File uploaded successfully');
				//TODO: save s3 urls correspondng to the files
				setDatasourceName('');
			}
		} catch (error) {
			setFiles([]);
			toast.error('Error uploading file');
		} finally {
			setProgress(0);
		}
	};
	const createDataSource = async () => {
		const token = Cookies.get('token');
		const data = {
			name: datasourceName,
			filepath: {
				file_name: '',
				file_id: uuid(),
				file_url: '',
			},
		};
		const response = await createDataSource(data, token);
	};

	useEffect(() => {
		const fetchDataSources = async () => {
			const token = Cookies.get('token') || tokenCookie;
			const data = await getDataSources(token);
			setDataSources(Array.isArray(data) ? data : []);
		};

		fetchDataSources();
	}, []);

	useEffect(() => {
		if (files.length && !showNoUpload) {
			uploadFileHelper();
		}
	}, [files.length]);

	useEffect(() => {
		setFormErrors((prev) => ({
			...prev,
			datasourceName: '',
		}));
	}, [datasourceName]);

	return (
		<div className="grid grid-cols-12 gap-4 pt-6">
			<div className="border rounded-3xl py-4 px-6 col-span-9 shadow-1xl">
				{' '}
				{/*TODO: add shadow */}
				<h3 className="text-primary80 font-semibold text-xl">
					Connect your datasource
				</h3>
				<p className="text-primary40 text-sm">
					Securely connect to a data source
				</p>
				{!showNoUpload && (
					<div className="mt-4 space-y-2 mb-10">
						<InputText
							placeholder="Name your data source"
							value={datasourceName}
							setValue={(e) => setDatasourceName(e)}
							error={formErrors.datasourceName}
							errorText={formErrors.datasourceName}
						/>
						<div
							className="w-full bg-purple-4 hover:bg-purple-8 text-purple-100 text-sm font-medium hover:text-purple-100 rounded-lg"
							onClick={(e) => {
								e.preventDefault();
								inputRef.current.click();
							}}
						>
							<label
								htmlFor="file-upload"
								className=" block text-center cursor-pointer py-2 px-4"
							>
								Upload your files
							</label>
						</div>
						<Input
							type="file"
							// multiple
							ref={inputRef}
							className="absolute top-0 w-0 -z-1 opacity-0"
							onChange={(e) => handleFileChange(e)}
							id="file-upload"
							accept=".csv, .pdf"
						/>
					</div>
				)}
				{Array.isArray(files) &&
					files?.map((file, idx) => (
						<div
							className="px-4 py-2.5 z-10 bg-purple-4 rounded-lg mt-2"
							key={file.name}
						>
							<div className="flex justify-between">
								<div className="flex gap-2 items-center">
									<img
										src={excel}
										alt="file-icon"
										className="size-6"
									/>
									<p className="text-sm text-purple-100 flex">
										{file.name || file.file_name}&nbsp;
										{file.size ? (
											<p className="text-sm font-medium text-primary80">{`(${formatFileSize(
												file?.size,
											)})`}</p>
										) : null}
									</p>
								</div>
								<div className="flex items-center text-sm font-medium">
									{!showNoUpload && progress < 100 ? (
										<p>uploading...</p>
									) : null}
									<Button
										variant="ghost"
										onClick={(e) =>
											handleRemoveFile(e, file, idx)
										}
										className="text-md py-0"
									>
										<i className="bi-x text-lg text-primary80 text-xl font-semibold cursor-pointer pr-0"></i>
									</Button>
								</div>
							</div>
							{!showNoUpload && progress <= 99.99 ? (
								<div className="mt-4">
									<Progress value={progress} className="h-2" />
								</div>
							) : null}
						</div>
					))}
				{Array.isArray(files) && files?.length && progress === 100 ? (
					<div className="mt-4">
						<Button
							className="w-full hover:bg-purple-100 hover:text-white hover:opacity-80"
							onClick={() => createDataSource()}
						>
							Save changes
						</Button>
					</div>
				) : null}
			</div>
			<div className="border rounded-3xl py-4 px-6 col-span-3 shadow-1xl h-fit">
				<h3 className="text-primary80 font-semibold text-xl">
					Manage Data Source
				</h3>
				<p className="text-primary40 text-sm">
					Securely connect to a data source
				</p>
				<div className="mt-4 space-y-2">
					{dataSources.length ? (
						dataSources.map((source) => (
							<div
								className="flex justify-between items-center bg-purple-4 py-2 px-4 rounded-xl cursor-pointer"
								key={source.datasource_id}
								onClick={() => {
									setShowNoUpload(true);
									setFiles(source.filepath);
								}}
							>
								<p className="text-primary80 font-medium">
									<i className="bi-database mr-2 text-primary80 text-md"></i>
									{source.name}
								</p>
							</div>
						))
					) : (
						<p className="text-primary40 text-sm">
							No data sources found
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Configuration;
