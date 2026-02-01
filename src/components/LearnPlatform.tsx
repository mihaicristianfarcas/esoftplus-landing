import { Play } from "lucide-react";
import videoPreview from "../assets/video-preview.png";
import videoPreviewBackground from "../assets/video-preview-bg.png";
import testimonialDots from "../assets/testimonial-dots.svg";

const LearnPlatform = () => {
	return (
		<section className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
			<div className="max-w-[1280px] mx-auto">
				<div className="flex flex-col gap-8 lg:gap-16">
					{/* Header + Video Row */}
					<div className="flex flex-col lg:flex-row items-stretch gap-12">
						{/* Left Column - Text Content */}
						<div className="flex flex-col justify-between w-full lg:w-[45%] shrink-0 gap-12 lg:gap-[15vh]">
							<h2 className="section-title">
								Learn How To Use <br />
								<span className="text-gray-300">The Platform.</span>
							</h2>

							{/* Testimonial - Desktop (hidden on mobile, shown below video) */}
							<div className="hidden lg:flex flex-row items-stretch gap-6">
								<img
									src={testimonialDots}
									alt=""
									className="h-full self-stretch"
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
										className="bg-white/95 backdrop-blur-md text-black p-3 lg:p-4 rounded-full flex items-center gap-3 hover:bg-white transition-all shadow-xl hover:scale-105"
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

					{/* Description + Mobile Testimonial Row */}
					<div className="flex flex-col lg:flex-row gap-12 mt-12 lg:mt-0">
						{/* Spacer for desktop alignment */}
						<div className="hidden lg:block lg:w-[45%] shrink-0" />

						<div className="flex flex-col gap-12">
							<p className="text-lg lg:text-xl leading-relaxed text-gray-600">
								Transform your WMEnterprise data into beautiful, interactive
								dashboards—no technical setup needed. Dive into ready-made
								reports, create custom analytics on the fly, and track your
								business from anywhere, all in a simple, mobile-friendly
								interface.
							</p>

							{/* Testimonial - Mobile (hidden on desktop) */}
							<div className="flex lg:hidden flex-row items-stretch gap-4">
								<img
									src={testimonialDots}
									alt=""
									className="h-auto w-4 self-stretch"
								/>
								<div>
									<p className="text-base leading-relaxed mb-4">
										"Using this app transformed the way we track our
										business—setup was effortless and the reports are spot-on."
									</p>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-gray-100" />
										<div>
											<p className="text-black font-semibold text-sm">
												Victor D.
											</p>
											<p className="text-gray-400 text-xs">Founder Baseline</p>
										</div>
									</div>
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
