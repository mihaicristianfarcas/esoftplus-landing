import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Hexagon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import chartsImage from "../assets/hero-dashboard-preview-charts.png";
import sidebarImage from "../assets/hero-dashboard-preview-with-sidebar.png";
import backgroundPattern from "../assets/gradient-hero.png";

const Hero = () => {
	const [isDemoHovered, setIsDemoHovered] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const ovalContainerRef = useRef<HTMLDivElement>(null);

	// Track scroll progress through the section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	// Transform values for the oval expansion
	// The oval needs to grow to fill the viewport
	const ovalScale = useTransform(scrollYProgress, [0, 0.5], [1, 3]);

	// Border radius from pill shape to rounded rectangle
	const borderRadius = useTransform(scrollYProgress, [0, 0.4], [200, 24]);

	// Move oval up to center in viewport as it expands
	const ovalY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-40%"]);

	// Image crossfade
	const chartsOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);
	const sidebarOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

	// Counter-scale for images - they should stay roughly the same size as container grows
	const imageCounterScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

	// Footer fade out
	const footerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

	return (
		<section ref={sectionRef} className="relative h-[200vh] w-full">
			{/* Sticky container that holds everything in place */}
			<div className="sticky top-0 min-h-svh w-full flex items-center justify-center overflow-hidden">
				{/* Background */}
				<div
					className="absolute inset-0 w-full h-full bg-center bg-no-repeat pointer-events-none"
					style={{
						backgroundImage: `url(${backgroundPattern})`,
						backgroundSize: "cover",
						filter: "saturate(1.5) contrast(1.2) brightness(0.9)",
					}}
				/>

				{/* Hero Content */}
				<div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32 pb-24 sm:pb-28 md:pb-32 text-center">
					{/* Top Text */}
					<p className="text-gray-400 mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-xl animate-fade-in">
						Unlock full potential.
					</p>

					{/* Main Heading */}
					<h1 className="hero-title mb-6 sm:mb-10 md:mb-14 lg:mb-16 xl:mb-28 tracking-tighter">
						Mobilize Your ERP
					</h1>

					{/* CTA Buttons */}
					<div className="grid grid-cols-1 grid-flow-col auto-cols-fr gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-8 md:mb-10 lg:mb-12">
						<button
							type="button"
							onMouseEnter={() => setIsDemoHovered(true)}
							onMouseLeave={() => setIsDemoHovered(false)}
							className="group/btn cursor-pointer flex items-center justify-center bg-black hover:bg-sky-400 text-white gap-2 sm:gap-4 md:gap-6 pl-1 sm:pl-1.5 pr-4 sm:pr-6 md:pr-8 py-1 sm:py-1.5 rounded-full transition-all duration-200 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap font-light tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
							aria-label="Try demo"
						>
							<div
								className="relative border border-gray-600 group-hover/btn:border-gray-300 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 overflow-hidden"
								style={{
									backgroundImage:
										"repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,255,255, 0.3) 3px, rgba(255,255,255,0.1) 4px)",
								}}
							>
								<ArrowUpRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
							</div>
							Try Demo
						</button>
						<button
							type="button"
							className="cursor-pointer flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-100 transition-all text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-tight border border-gray-300 px-4 sm:px-6 md:px-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
							aria-label="Contact us"
						>
							Contact Us
						</button>
					</div>

					{/* Dashboard Image Container - Animated Oval */}
					<div className="relative w-[92%] sm:w-[90%] md:w-[88%] lg:w-[85%] max-w-5xl mx-auto">
						<motion.div
							ref={ovalContainerRef}
							onMouseEnter={() => setIsDemoHovered(true)}
							onMouseLeave={() => setIsDemoHovered(false)}
							className="relative w-full bg-[#F0F0F0] overflow-hidden rounded-[200px] z-30 origin-center"
							style={{
								aspectRatio: "23 / 11",
								scale: ovalScale,
								borderRadius: borderRadius,
								y: ovalY,
							}}
						>
							{/* Charts Image (initial) - with counter-scaling to maintain size */}
							<motion.div
								className="absolute inset-0 w-full h-full"
								style={{ 
									opacity: chartsOpacity,
									scale: imageCounterScale,
								}}
							>
								{/* Shadow wrapper - stays fixed at top */}
								<div
									className="absolute w-[75%] left-1/2 transform -translate-x-1/2 top-0"
									style={{
										filter: "drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.3))",
									}}
								>
									{/* Blur target - separate from shadow */}
									<div
										className={`transition-all duration-200 ${isDemoHovered ? "blur-sm" : ""}`}
									>
										<img
											src={chartsImage}
											alt="Dashboard Preview"
											className="w-full h-auto rounded-md sm:rounded-lg lg:rounded-xl"
										/>
									</div>
								</div>

								{/* Enter button - appears on hover */}
								<div
									className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isDemoHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
								>
									<button
										type="button"
										className="bg-black text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-light tracking-tight hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
									>
										Enter
									</button>
								</div>
							</motion.div>

							{/* Sidebar Image (transitions in) - with counter-scaling */}
							<motion.div
								className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#F0F0F0]"
								style={{ 
									opacity: sidebarOpacity,
									scale: imageCounterScale,
								}}
							>
								<div
									className="w-[48%]"
									style={{
										filter: "drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.3))",
									}}
								>
									<img
										src={sidebarImage}
										alt="Dashboard with Sidebar Preview"
										className="w-full h-auto rounded-md sm:rounded-lg lg:rounded-xl"
									/>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Hero Footer */}
				<motion.div
					className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 bottom-4 sm:bottom-6 lg:bottom-8 flex items-end justify-between gap-4"
					style={{ opacity: footerOpacity }}
				>
					{/* Left Side - Used By */}
					<div className="flex flex-col items-start gap-0.5 text-sm sm:text-base md:text-lg lg:text-xl shrink-0">
						<span className="font-light text-gray-400">Used By</span>
						<span className="font-light text-black">Untold</span>
					</div>

					{/* Center - Description */}
					<div className="hidden md:block flex-1 max-w-xl xl:max-w-2xl text-center mx-4 lg:mx-6 xl:mx-8">
						<p className="text-gray-400 font-light text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
							Unlock instant analytics and reporting for your WMEnterprise data.
							<br className="hidden lg:block" /> No setup headaches, just powerful
							insights, ready to go
						</p>
					</div>

					{/* Right Side - Scroll Indicator */}
					<div className="flex flex-col items-center gap-1 sm:gap-1.5 shrink-0">
						<div className="w-5 sm:w-6 lg:w-8 h-10 sm:h-12 lg:h-16 border-2 border-black rounded-full flex items-end justify-center pb-1.5 sm:pb-2">
							<Hexagon className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 fill-black text-black" />
						</div>
						<span className="text-[10px] sm:text-xs lg:text-sm text-black tracking-wider font-medium">
							SCROLL
						</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;