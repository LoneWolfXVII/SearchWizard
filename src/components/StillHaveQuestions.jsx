const StillHaveQuestions = ({ setOpen }) => {
	return (
		<section className=" mt-10">
			<div className="my-container sm:w-fit mx-auto">
				<div className="bg-backgrounds-light rounded-2xl py-10 px-8 justify-center">
					<img
						src="/assets/icons/avatar-group.svg"
						alt="FAQ"
						className="mx-auto"
					/>
					<div className="text-center mt-8">
						<h6
							className="text-xl leading-[30px] font-medium
                        "
						>
							Still have questions?
						</h6>
						<p className="text-lg font-normal">
							Can’t find the answer you’re looking for? Please chat to
							our friendly team.
						</p>
						<button
							className="mx-auto secondary-button sm:[w-fit] mt-8"
							onClick={() => setOpen(true)}
						>
							Get a Demo
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StillHaveQuestions;
