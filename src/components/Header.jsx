/**@format */
import { useEffect, useState } from 'react';
import { headerData } from './config';

const Header = ({ setOpen }) => {
	const [isTop, setIsTop] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const top = window.scrollY < 100;
			setIsTop(top);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [])

	return (
		<header
			className={`absolute top-0 left-0 w-full transition-all ease-in-out tPro:duration-300 tPro:h-fit ${isTop ? 'border-transparent' : 'border-b bg-white/75 backdrop-blur-lg '}`}
		>
			<div className="grid grid-cols-12 gap-1 py-4 px-8 items-center">
				<div className="tPro:col-span-2 col-span-12 tPro:inline-block flex gap-2 justify-between">
					<h1 className=" text-2xl leading-[29.05px] tracking-[0.2px] font-extrabold text-black/80">
						IRAME.AI
					</h1>
				</div>
				<div className="col-span-8 my-auto ">
					<ul className="flex gap-8 items-center justify-center">
						{/* {headerData?.menuList?.map((list, indx) => {
							return (
								<li
									key={list?.key}
									className=" text-base leading-[26px] font-semibold text-black/60 cursor-pointer"
								>
									{list?.label}
								</li>
							);
						})} */}
					</ul>
				</div>
				<div className="col-span-2 my-auto ml-auto tPro:block hidden">
					<button className="primary-button" onClick={() => setOpen(true)}>
						{headerData?.btnText}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
