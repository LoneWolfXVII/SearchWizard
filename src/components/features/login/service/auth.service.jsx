import { API_URL } from '@/config';
import axios from 'axios';

export const loginWithGoogle = async (data) => {
	const response = await axios.post('auth/google/callback', data);
	return response.data;
};
export const logout = async () => {
	const response = await axios.get(`${API_URL}/oauth/google/logout`);
	window.location.href = '/';
	return response.data;
};
