import axios from 'axios';

export const loginWithGoogle = async (data) => {
	const response = await axios.post('auth/google/callback', data);
	return response.data;
};
