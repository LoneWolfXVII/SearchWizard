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
	'gAAAAABmIE2Xhz0o-GG05oQoGcCgCgE05uLaOPWHFCc-E9zicinHJ7Ji0VjLHIm6Yu5CqVl41n49VgjXWvBKlB1E476GmxX_-SlZnFxg08A1z72qHQirlvqf8zGnve-UcjDnLqPtrIrjuZx1hKwOg3cjRG6xEvGchw==';
