const Dialog = ({ data, zIndex, width, children, setOpen, enterpriseName }) => {
	return (
		<div
			className={`fixed top-0 left-0 ${
				zIndex ? zIndex : 'z-10'
			} h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
			tabIndex="-1"
		>
			<div className="fixed inset-0 bg-black/60 bg-opacity-80 transition-opacity"></div>
			<div className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] transform-none items-center opacity-100 min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-fit">
				<div className="modal-content  pointer-events-auto relative  w-full rounded-xl border-none bg-white bg-clip-padding p-6 text-current shadow-lg outline-none">
					<div className="modal-header mb-2 flex gap-2 justify-center w-full relative">
						{data?.icon ? (
							<div className="flex justify-center">
								<img src={data?.icon} alt="" className="w-16 h-16" />
							</div>
						) : null}
						<div className="absolute right-0">
							<span
								className="cursor-pointer text-black/60"
								onClick={() => setOpen(false)}
							>
								<img
									src="/assets/icons/plus.svg"
									alt="close"
									className="transform rotate-45 w-9 h-9"
								/>
							</span>
						</div>
					</div>

					<div
						className={['grow text-center', width ? width : ''].join(
							' ',
						)}
					>
						{data?.heading && (
							<h1 className="mb-2 text-xl font-semibold text-black/90">
								{data?.heading}
							</h1>
						)}
						{data?.subheading && (
							<div
								className={[
									' text-sm font-normal leading-5 text-black/60 w-full text-center',
								].join(' ')}
							>
								{data?.subheading}
							</div>
						)}
					</div>
					<div className="modal-body relative w-full">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
