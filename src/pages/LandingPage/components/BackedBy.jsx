const BackedBy = () => {
  return (
    <div className="bg-gray-secondary p-[7.5rem] flex flex-col">
      <h1 className="text-[72px] leading-[80px] text-center font-bold">
      Backed By Some of the Best Minds in the Industry 
      </h1>
      <p className="text-2xl mt-4 text-center text-black/60">
        Transforming the way finance professionals work
      </p>
      <div className="flex pt-24 justify-center flex-wrap gap-20">
        <img src="/assets/logos/ey.svg" alt="ey logo" />
        <img src="/assets/logos/pwc.svg" alt="pwc logo" />
        <img src="/assets/logos/kpmg.svg" alt="kpmg logo" />
        <img
          src="/assets/logos/deloitte.svg"
          alt="deloitte logo"
        />
        <img src="/assets/logos/bcg.svg" alt="bcg logo" />
      </div>
    </div>
  )
}

export default BackedBy