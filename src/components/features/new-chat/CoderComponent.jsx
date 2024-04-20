import { Editor } from '@monaco-editor/react';
import React from 'react';

const CoderComponent = () => {
	return (
		<div>
			<Editor
				height="65vh"
				theme="vs-dark"
				defaultLanguage="javascript"
				defaultValue="console.log('Hello, World!');
if(a < b) {
	return a;
} else {
	return b;
}
				"
				className="rounded-2xl"
			/>
		</div>
	);
};

export default CoderComponent;
