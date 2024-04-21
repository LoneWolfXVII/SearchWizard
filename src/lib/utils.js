import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const formatFileSize = (size) => {
	if (size < 1024) {
		return size + ' B';
	} else if (size < 1024 * 1024) {
		return (size / 1024).toFixed(2) + ' KB';
	} else if (size < 1024 * 1024 * 1024) {
		return (size / (1024 * 1024)).toFixed(2) + ' MB';
	} else {
		return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
	}
};

export const getToken = () => {
	const cookieString = document.cookie;

	const cookies = cookieString.split(';').map((cookie) => cookie.trim());

	for (const cookie of cookies) {
		if (cookie.startsWith('token')) {
			return cookie.split('=')[1];
		}
	}
	return null;
};

//TODO: make a generic function to get data from cookies

export const tokenCookie =
	'gAAAAABmJO4SybZBhnXuHFlQLJqahMs2lXfvHbRoT-B-DOSMa3xpR2O-C73fkbkUV2g_aOI6o1yIXIeapqXxH7HaABSK5HLaGIRrZEkP8IECtbe6qjDqiYlT7mpyzRq3IdN9GCJRcu8y0IwkRzzC7K9JyfE5QZ-RJw==';
