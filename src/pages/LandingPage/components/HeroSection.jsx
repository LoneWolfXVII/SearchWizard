const HeroSection = ({setOpen}) => {
  return (
    <div className="hero-section tPro:py-4 tPro:h-full tPro:pt-24 pt-14 tPro:px-0 px-6 pb-40">
      {/* Title */}
      <div className="flex flex-col mx-[12rem] gap-4 items-center pt-16">
        {/* Text */}
        <h1 className="text-[88px] leading-[88px] text-center font-bold">
          AI in Finance to Put Your Processes on <span className='text-border-primary'> Autopilot</span>
        </h1>
        <p className="text-2xl text-center text-black/60">Transforming the way finance professionals work</p>
        <div className="pt-12">
					<button className="primary-button" onClick={() => setOpen(true)} >
						Start for Free
					</button>
				</div>
      </div>
      {/* Image */}
      <div className="mt-16">
      <img src="/assets/bgs/ira-new-chat-home.svg" className="w-[70%] mx-auto " />
      </div> 
      {/* Trusted By */}
      <div className="flex flex-col gap-2 items-center py-24"> 
        <div className="text-border-light">Trusted By Many Companies</div>
        <div className="flex pt-8 gap-28">
          <img src="/assets/logos/paga-logo.svg" alt="paga logo" />
          <img src="/assets/logos/ebay-logo.svg" alt="ebay logo" />
          <img src="/assets/logos/airbnb-logo.svg" alt="airbnb logo" />
          <img src="/assets/logos/facebook-logo.svg" alt="facebook logo" />
          <img src="/assets/logos/cocacola-logo.svg" alt="cocacola logo" />
          <img src="/assets/logos/zoom-logo.svg" alt="zoom logo" />
        </div>
      </div> 
    </div>
  );
};

export default HeroSection;
