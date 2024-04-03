const Input = ({ error, field, label, value, setValue }) => {
	return (
		<div className="input-wrapper disabled-input relative mb-6">
			<input
				type="text"
				className={`block w-full ${error[field] ? '!border-red-500' : ''}`}
				required
				name={field}
				value={value}
				onChange={(e) => setValue(e)}
				autoComplete="off"
				onFocus={(e) => {
					e.target.select();
				}}
			/>

			<label
				htmlFor={field}
				className={` ${error[field] ? '!text-red-500' : ''}`}
			>
				{label}
			</label>
			{error[field] ? (
				<p className="mb-0 pt-1 text-xs text-red-500">{error[field]}</p>
			) : null}
		</div>
	);
};

export default Input;
