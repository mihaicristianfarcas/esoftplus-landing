import { Play } from "lucide-react";
import videoPreview from "../assets/video-preview.png";
import videoPreviewBackground from "../assets/video-preview-bg.png";
import testimonialDots from "../assets/testimonial-dots.svg";

const LearnPlatform = () => {
	const handleVideoClick = () => {
		// TODO: Implement video modal or navigation
		console.log("Open video player");
	};

	return (
		<section className="relative w-full min-h-screen py-16 xl:py-0 xl:h-screen flex flex-col justify-center overflow-hidden">
			<div className="max-w-[1280px] mx-auto px-6">
				<div className="flex flex-col gap-8 lg:gap-16">
					{/* Header + Video Row */}
					<div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
						{/* Left Column - Text Content */}
						<div className="flex flex-col justify-between w-full lg:w-[45%] shrink-0 gap-8 lg:gap-[15vh]">
							<h2 className="section-title">
								Learn How To Use <br />
								<span className="text-gray-300">The Platform.</span>
							</h2>

							{/* Testimonial */}
							<div className="lg:flex flex-row items-stretch gap-6">
								<img
									src={testimonialDots}
									alt=""
									className="h-10 lg:h-full self-stretch"
								/>
								<div>
									<p className="text-lg lg:text-xl leading-relaxed mb-6">
										"Using this app transformed the way we track our
										business—setup was effortless and the reports are spot-on.
										We finally have the insights we need, right at our
										fingertips!"
									</p>

									{/* Author */}
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-full bg-gray-100" />
										<div>
											<p className="text-black font-semibold">Victor D.</p>
											<p className="text-gray-400 text-sm">Founder Baseline</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Video Card */}
						<div
							className="relative rounded-[2.5rem] p-6 lg:p-12 flex-1 flex items-center justify-center min-h-[240px] lg:min-h-0"
							style={{
								background: `url(${videoPreviewBackground})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							{/* Video Preview Container */}
							<div className="relative rounded-2xl overflow-hidden w-full mx-auto shadow-2xl">
								<img
									src={videoPreview}
									alt="Dashboard Video Preview"
									className="w-full h-full object-contain"
								/>

								{/* Watch Video Button Overlay */}
								<div className="absolute inset-0 flex items-center justify-center">
									<button
										type="button"
										onClick={handleVideoClick}
										className="cursor-pointer bg-white/95 backdrop-blur-md text-black p-3 lg:p-4 rounded-full flex items-center gap-3 hover:bg-white transition-all shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
										aria-label="Watch platform tutorial video"
									>
										<Play className="w-5 h-5 text-black fill-black" />
										<span className="font-semibold text-sm lg:text-base">
											Watch Video
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LearnPlatform;
