import { Play } from "lucide-react";
import videoPreview from "../assets/video-preview.png";
import videoPreviewBackground from "../assets/video-preview-bg.png";
import testimonialDots from "../assets/testimonial-dots.svg";

const LearnPlatform = () => {
	return (
		<section className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden">
			<div className="max-w-400 mx-auto w-full">
				<div className="flex flex-row items-end gap-[5vw]">
					{/* First item: Title+Testimonial row & Video Preview stacked */}
					<div className="flex flex-col gap-6 flex-1 min-w-0">
						{/* Top row: Title + Video side by side */}
						<div className="flex flex-row items-stretch gap-[5vw]">
							{/* Left Column - Text Content */}
							<div className="flex flex-col justify-between w-[40%] gap-[15vh] shrink-0">
								<h2 className="text-6xl md:text-7xl font-light leading-tight tracking-tighter whitespace-nowrap">
									Learn How To Use <br />
									<span className="text-gray-300">The Platform.</span>
								</h2>

								{/* Testimonial */}
								<div className="flex flex-row items-stretch gap-4">
									<img
										src={testimonialDots}
										alt=""
										className="h-full self-stretch"
									/>
									<div>
										<p className="text-lg leading-relaxed mb-6">
											"Using this app transformed the way we track our
											business—setup was effortless and the reports are spot-on.
											We finally have the insights we need, right at our
											fingertips!"
										</p>

										{/* Author */}
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-full bg-gray-200" />
											<div>
												<p className="text-black font-medium">Victor D.</p>
												<p className="text-gray-400 text-sm">
													Founder Baseline
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Right Column - Video Card */}
							<div
								className="relative rounded-3xl p-8 flex-1 min-w-0 flex items-center justify-center"
								style={{
									background: `url(${videoPreviewBackground})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								{/* Video Preview Container */}
								<div className="relative rounded-2xl overflow-hidden w-[90%] mx-auto">
									<img
										src={videoPreview}
										alt="Dashboard Video Preview"
										className="w-full h-full object-contain"
									/>

									{/* Watch Video Button Overlay */}
									<div className="absolute inset-0 flex items-center justify-center">
										<button
											type="button"
											className="bg-white/95 backdrop-blur-sm text-black px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white transition-all shadow-lg"
										>
											<Play className="w-5 h-5 text-black fill-black" />
											<span className="font-medium">Watch Video</span>
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Description Text - directly below video preview */}
						<p className="text-xl leading-relaxed mt-2 ml-[calc(40%+5vw)]">
							Transform your WMEnterprise data into beautiful, interactive
							dashboards—no technical setup needed. Dive into ready-made
							reports, create custom analytics on the fly, and track your
							business from anywhere, all in a simple, mobile-friendly
							interface.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LearnPlatform;
