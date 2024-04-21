import { useState } from 'react';

const initialValue = {
	userDetails: {
		userName: 'John Doe',
		email: 'john.doe@gmail.com',
		userId: 'zi3wfrj',
		token: '',
	},
	answerRespConfig: {},
};

const useLocalStorage = (key) => {
	const storedValue = localStorage.getItem(key);
	const initial = storedValue ? JSON.parse(storedValue) : initialValue[key];

	const [value, setValue] = useState(initial);

	const updateValue = (newValue) => {
		setValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, updateValue];
};

export default useLocalStorage;
