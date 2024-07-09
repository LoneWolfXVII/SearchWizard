const HeroSection = ({setOpen}) => {
  return (
    <div className="hero-section xs:h-[60rem] sm:h-[90rem] md:h-full tPro:py-4 tPro:h-full tPro:pt-24 pt-14 tPro:px-0 px-6 pb-40">
      {/* Title */}
      <div className="flex flex-col sm:mx-[12rem] gap-4 items-start sm:items-center md:pt-16">
        {/* Text */}
        <h1 className="md:text-[88px] text-[34px] leading-[44px] md:leading-[88px] sm:text-center font-bold">
          AI in Finance to Put Your Processes on <span className='text-border-primary'> Autopilot</span>
        </h1>
        <p className="text-[14px] sm:text-2xl sm:text-center text-black/60">Transforming the way finance professionals work</p>
        <div className="xs:w-full sm:w-fit pt-3 md:pt-12">
					<button className="primary-button" onClick={() => setOpen(true)} >
						Start for Free
					</button>
				</div>
      </div>
      {/* Image */}
      <div className="mt-16">
      <img src="/assets/bgs/ira-new-chat-home.svg" className="w-full sm:w-[70%] sm:mx-auto " />
      </div> 
      {/* Trusted By */}
      <div className="flex flex-col gap-2 items-center py-24">
  <div className="text-border-light">Trusted By Many Companies</div>
  <div className="flex flex-wrap justify-center xs:gap-4 md:gap-16 pt-8">
    {Array.isArray(trustedLogos) && trustedLogos.map((logo, index) => {
      return (
        <img
          key={`trusted_logo_${index}`}
          src={logo.img}
          alt={logo.name}
          className="w-12 md:max-h-20 sm:w-32 md:w-40"
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
    img: '/assets/logos/dangote.svg',
    name: 'Dangote',
  },
  {
    img: '/assets/logos/uba.svg',
    name: 'UBA',
  },
  {
    img: '/assets/logos/mtn.svg',
    name: 'MTN',
  },
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
  {
    img: '/assets/logos/airtel.svg',
    name: 'Airtel',
  },
  {
    img: '/assets/logos/creative-cloud.svg',
    name: 'CreativeCloud',
  },
  {
    img: '/assets/logos/netflix.svg',
    name: 'Netflix',
  },
  {
    img: '/assets/logos/discord.svg',
    name: 'Discord',
  },
  {
    img: '/assets/logos/paypal.svg',
    name: 'Paypal',
  },
];

