import { useState } from 'react';

const VideoSection = () => {
	const [videoUrl, setVideoUrl] = useState(
		'https://www.youtube.com/embed/uYsYdsIkKUI',
	);
	const [hover, setHover] = useState(false);

	const handlePlayVideo = () => {
		if (!videoUrl.includes('autoplay=1')) {
			setVideoUrl(
				(prevUrl) =>
					prevUrl + (videoUrl.includes('?') ? '&' : '?') + 'autoplay=1',
			);
		} else {
			setVideoUrl((prevUrl) => prevUrl.replace('?autoplay=1', ''));
		}
	};

	return (
		<section className="mt-32">
			<div className="tPro:px-[220px] my-container">
				<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-[0.81px] border-border-primary">
					<iframe
						// width="949"
						height="534"
						src={videoUrl}
						title=""
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowfullscreen
						className="w-full rounded-lg"
					></iframe>
				</div>
				<div
					className="mt-10 flex flex-wrap items-center cursor-pointer rounded-full border border-black py-4 px-8 text-xl leading-8 font-medium max-w-fit hover:bg-primary hover:text-white hover:border-none"
					onClick={handlePlayVideo}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<img
						src={
							hover
								? '/assets/icons/play-btn_white.svg'
								: '/assets/icons/play-btn_black.svg'
						}
						className="size-8 mr-2"
					/>
					<span>Watch Video</span>
				</div>
			</div>
		</section>
	);
};

export default VideoSection;
