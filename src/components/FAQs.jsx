import { useState } from 'react';
import { faqs } from '../types/home.content';

const FAQs = () => {
	const [showAnswer, setShowAnswer] = useState(-1);

	return (
		<section className="w-full tPro:mt-32 mt-14">
			<div className="my-container">
				<h2 className="w-full tPro:text-center tPro:mb-16 mb-10">
					{faqs?.heading}
				</h2>
				<div className="grid tPro:grid-cols-2 grid-cols-1 gap-x-16 mb-32">
					{faqs?.questions?.map((faq, index) => {
						const isOpen = showAnswer === faq.id;
						return (
							<div
								key={index}
								className={`py-6 border border-r-0 border-l-0 h-fit inline-block ${
									faq.showDivider
										? 'border-b-gray-100'
										: 'border-b-0'
								}  border-t-gray-100`}
							>
								<div
									className="flex gap-2 items-center justify-between h-auto cursor-pointer"
									onClick={() =>
										setShowAnswer((prevId) =>
											prevId === faq.id ? null : faq.id,
										)
									}
								>
									<div className="flex gap-5 items-center cursor-pointer">
										<img
											src={'/assets/icons/Featured icon.svg'}
											className="mb-auto h-12 w-12"
											alt="Featured Icon"
										/>
										<h3 className="text-xl font-semibold text-black/60">
											{faq.ques}
										</h3>
									</div>
									<img
										src="/assets/icons/plus.svg"
										alt="Toggle"
										className={`transition ease-in-out transform ${
											isOpen ? 'rotate-45' : 'rotate-0'
										}`}
									/>
								</div>
								<div
									className={`${
										isOpen
											? 'openaccordion-content open'
											: 'accordion-content'
									} px-16`}
								>
									<p className="text-base leading-[29px] tracking-[-0.2px] font-light text-black/65">
										{faq.answer}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FAQs;
