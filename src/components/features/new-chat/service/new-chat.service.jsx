import axios from 'axios';
import { API_URL } from '@/config';

export const fetchSuggestions = async (dataSourceId, token) => {
	const response = await axios.get(
		`${API_URL}/config/datasource/${dataSourceId}/suggestion`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};
