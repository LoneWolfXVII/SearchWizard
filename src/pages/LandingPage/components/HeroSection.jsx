const HeroSection = ({setOpen}) => {
  return (
    <div className="hero-section tPro:py-4 tPro:h-full tPro:pt-24 pt-14 tPro:px-0 px-6 pb-40">
      {/* Title */}
      <div className="flex flex-col sm:mx-[12rem] gap-4 items-start md:items-center md:pt-16">
        {/* Text */}
        <h1 className="md:text-[88px] text-[34px] leading-[44px] md:leading-[88px] sm:text-center font-bold">
          AI in Finance to Put Your Processes on <span className='text-border-primary'> Autopilot</span>
        </h1>
        <p className="text-2xl sm:text-center text-black/60">Transforming the way finance professionals work</p>
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
  <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 pt-8">
    {Array.isArray(trustedLogos) && trustedLogos.map((logo, index) => {
      return (
        <img
          key={`trusted_logo_${index}`}
          src={logo.img}
          alt={logo.name}
          className="w-24 h-auto sm:w-32 md:w-40"
        />
      );
    })}
  </div>
</div>

    </div>
  );
};

export default HeroSection;


const trustedLogos = [
    {
      img: '/assets/logos/paga-logo.svg',
      name: 'Paga',
    },
    {
      img: '/assets/logos/ebay-logo.svg',
      name: 'Ebay',
    },
    {
      img: '/assets/logos/airbnb-logo.svg',
      name: 'Airbnb',
    },
    {
      img: '/assets/logos/facebook-logo.svg',
      name: 'Facebook',
    },
    {
      img: '/assets/logos/cocacola-logo.svg',
      name: 'Cocacola',
    },
    {
      img: '/assets/logos/zoom-logo.svg',
      name: 'Zoom',
    },
  ];