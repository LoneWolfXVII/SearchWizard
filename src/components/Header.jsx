/**@format */
import React, { useEffect, useRef, useState } from 'react';
import { headerData } from './config';
import { Link } from 'react-router-dom';

const Header = ({ setOpen }) => {
	// const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

	// const [headerClass, setHeaderClass] = useState('bg-transparent');
	// const [isMobileMenu, setIsMobileMenu] = useState(false);
	// const dropdownRef = useRef(null);

	// const toggleMobileMenu = () => {
	// 	try {
	// 		setIsMobileMenu(!isMobileMenu);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// const handleHeaderScroll = useDebouncedCallback(() => {
	// 	if (window.scrollY > 30) {
	// 		setHeaderClass('bg-header');
	// 	} else {
	// 		setHeaderClass('bg-transparent');
	// 	}
	// }, 10);

	// useEffect(() => {
	// 	const eventHandler = () => handleHeaderScroll();

	// 	window.addEventListener('scroll', eventHandler);

	// 	return () => {
	// 		window.removeEventListener('scroll', eventHandler);
	// 		handleHeaderScroll.cancel();
	// 	};
	// }, [handleHeaderScroll]);

	// useClickOutside(dropdownRef, () => setIsMobileMenu(false));

	return (
		<header
			className={`absolute top-0 left-0 w-full transition-all ease-in-out lpro:duration-300 lpro:h-fit`}
		>
			<div className="grid grid-cols-12 gap-1 py-4 px-8 items-center">
				<div className="lpro:col-span-2 col-span-12 lpro:inline-block flex gap-2 justify-between">
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
				<div className="col-span-2 my-auto ml-auto lpro:block hidden">
					<button className="primary-button" onClick={() => setOpen(true)}>
						{headerData?.btnText}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
