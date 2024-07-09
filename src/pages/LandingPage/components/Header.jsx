/**@format */

import { useEffect, useState } from 'react'

const Header = ({
	setOpen
}) => {
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
    <div className={`flex sticky top-0 w-full h-20 justify-between items-center py-3 px-4 sm:py-4 sm:px-6 ${isTop ? 'border-transparent' : 'border-b bg-white/75 backdrop-blur-lg '} `}>
      <div className='text-2xl leading-[29.05px] tracking-[0.2px] font-extrabold text-black/80'>IRAME.AI</div>
      <div className="flex">
			<button className="secondary-button leading-6 border-border-light border-2" onClick={() => setOpen(true)}>
				Get a Demo
			</button>
		</div>
    </div>
  )
}

export default Header