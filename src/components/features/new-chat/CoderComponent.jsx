import { Editor } from '@monaco-editor/react';
import React from 'react';

const CoderComponent = () => {
	return (
		<div>
			<Editor
				height="68vh"
				theme="vs-dark"
				defaultLanguage="javascript"
				defaultValue="console.log('Hello, World!');
if(a < b) {
	return a;
} else {
	return b;
}
				"
				className="[&>.monaco-editor]:rounded-2xl bg-primary40"
			/>
		</div>
	);
};

export default CoderComponent;
