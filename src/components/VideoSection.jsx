import { useState } from 'react';

const VideoSection = () => {
	const [videoUrl, setVideoUrl] = useState(
		'https://www.youtube.com/embed/8a_65JhtN08?si=yNVtDDhk06cWWdsf',
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
						// width="560"
						// height="534"
						height="315"
						src={videoUrl}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowfullscreen
						className="w-full rounded-lg"
					></iframe>
				</div>
			</div>
		</section>
	);
};

export default VideoSection;
