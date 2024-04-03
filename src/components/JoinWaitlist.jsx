import { useEffect, useState } from 'react';
import Input from './Input';
import { joinWaitlist } from '../types/home.content';
import { mailFormatRegEx } from '../lib/utils';
import { axios } from '../lib/axios';

const JoinWaitlist = ({ setOpen }) => {
	const [formFields, setFormFields] = useState({
		email: '',
		useCase: '',
	});
	const [formError, setFormError] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleSelectUseCase = (useCase) => {
		setFormFields({ ...formFields, useCase: useCase });
	};

	const verifyFormFields = () => {
		let error = {};
		if (!formFields.email.trim()) {
			error.email = 'Email is required';
		}
		if (formFields.email.trim() && !mailFormatRegEx.test(formFields.email)) {
			error.email = 'Please enter a valid email';
		}

		if (!formFields.useCase) {
			error.useCase = 'Use case is required';
		}

		return error;
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		let error = verifyFormFields();
		setFormError(error);
		if (Object?.keys(error)?.length > 0) {
			setIsLoading(false);
			return;
		}

		axios
			.post('/waitlist', {
				email_id: formFields.email,
				usecase: formFields.useCase,
			})
			.then((res) => {
				setIsLoading(false);
				setFormFields({ email: '', useCase: '' });
				setOpen(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
			});
	};

	useEffect(() => {
		setFormError({});
	}, [formFields, setFormError]);
	return (
		<div className="mt-10 max-w-[500px]">
			<Input
				value={formFields?.email}
				setValue={(e) =>
					setFormFields({ ...formFields, email: e.target.value })
				}
				label="Email Id"
				field="email"
				error={formError}
			/>
			<div className="mt-10 ">
				<p className="text-base font-semibold text-black/80">Use Case</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{Array.isArray(joinWaitlist?.useCases) &&
						joinWaitlist?.useCases.map((useCase, index) => (
							<span
								key={useCase.value}
								onClick={() => handleSelectUseCase(useCase.value)}
								className={`text-sm font-normal text-black/60 px-3 py-1.5 border border-black/10 rounded-[30px] cursor-pointer hover:bg-primary/[0.08] ${
									formFields?.useCase === useCase.value
										? 'bg-primary/[0.08] border-[1.2px] border-primary'
										: ''
								}`}
							>
								{useCase?.label}
							</span>
						))}
				</div>
				{formError['useCase'] ? (
					<p className="mb-0 pt-1 text-xs text-red-500">
						{formError['useCase']}
					</p>
				) : null}
			</div>
			<button
				className={`primary-button mt-10 text-center w-full ${
					isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
				}`}
				onClick={() => handleSubmit()}
				disabled={isLoading}
			>
				{isLoading ? 'Submitting...' : 'Submit'}
			</button>
		</div>
	);
};

export default JoinWaitlist;
