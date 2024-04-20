import axios from 'axios';
import { AI_API_URL, API_URL } from '@/config';

export const uploadFile = async (files, setProgress) => {
	const formData = new FormData();

	files.forEach((file, idx) => {
		formData.append(`files`, file);
	});
	const response = await axios.post(
		`${AI_API_URL}/ira/config/generate_file_urls`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: (progressEvent) => {
				const progress = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total,
				);
				setProgress(progress);
			},
		},
	);

	return response.data;
};

export const getDataSources = async (authToken) => {
	const response = await axios.get(`${API_URL}/config/datasource/`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});

	return response.data;
};
