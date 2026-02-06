import { useRef, useState } from "react";
import { ArrowUpRight, Hexagon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import dashboardImage from "../assets/dashboard.jpg";
import backgroundPattern from "../assets/gradient-hero.png";
import sidebarOnlyImage from "../assets/sidebar.jpeg";

// SVG Tooltip connector component - renders circle + dashed path
interface TooltipConnectorProps {
	direction: "right-1" | "right-2" | "left" | "down-left" | "down-right";
	lineLength?: number;
	verticalLength?: number;
}

const TooltipConnector = ({
	direction,
	lineLength = 150,
	verticalLength = 50,
}: TooltipConnectorProps) => {
	const CIRCLE_RADIUS = 9;
	const STROKE_WIDTH = 2;
	const PADDING = STROKE_WIDTH; // Padding to prevent stroke clipping
	const CORNER_RADIUS = 10;
	const STROKE_COLOR = "#D1D5DB"; // gray-300

	// Calculate SVG dimensions based on direction (with padding for stroke)
	const getDimensions = () => {
		switch (direction) {
			case "right-1":
				return {
					width: lineLength + CIRCLE_RADIUS * 2 + PADDING * 2,
					height: CIRCLE_RADIUS * 2 + PADDING * 2,
				};
			case "right-2":
			case "left":
				return {
					width: lineLength + CIRCLE_RADIUS * 2 + PADDING * 2,
					height: CIRCLE_RADIUS * 2 + PADDING * 2,
				};
			case "down-left":
				return {
					width: lineLength + CIRCLE_RADIUS * 2 + PADDING * 2,
					height: verticalLength + CIRCLE_RADIUS * 2 + PADDING * 2,
				};
			case "down-right":
				return {
					width: lineLength + CIRCLE_RADIUS * 2 + PADDING * 2,
					height: verticalLength + CIRCLE_RADIUS * 2 + PADDING * 2,
				};
		}
	};

	const getPath = () => {
		const dims = getDimensions();
		const startX = CIRCLE_RADIUS + PADDING;
		const endX = dims.width - CIRCLE_RADIUS - PADDING;
		const centerY = dims.height / 2;
		const topY = CIRCLE_RADIUS + PADDING;
		const bottomY = dims.height - CIRCLE_RADIUS - PADDING;

		switch (direction) {
			case "right-1":
			case "right-2":
				// Circle on left, line goes right to text
				return `M ${startX} ${centerY} H ${endX}`;
			case "left":
				// Circle on right, line goes left to text
				return `M ${endX} ${centerY} H ${startX}`;
			case "down-left":
				// Circle at TOP-RIGHT, path goes: down from circle -> corner -> left to text
				return `M ${endX} ${topY}
						V ${bottomY - CORNER_RADIUS}
						Q ${endX} ${bottomY}, ${endX - CORNER_RADIUS} ${bottomY}
						H ${startX}`;
			case "down-right":
				// Circle at TOP-LEFT, path goes: down from circle -> corner -> right to text
				return `M ${startX} ${topY}
						V ${bottomY - CORNER_RADIUS}
						Q ${startX} ${bottomY}, ${startX + CORNER_RADIUS} ${bottomY}
						H ${endX}`;
		}
	};

	const getCirclePosition = () => {
		const dims = getDimensions();
		const startX = CIRCLE_RADIUS + PADDING;
		const endX = dims.width - CIRCLE_RADIUS - PADDING;
		const centerY = dims.height / 2;
		const topY = CIRCLE_RADIUS + PADDING;

		switch (direction) {
			case "right-1":
			case "right-2":
				return { cx: startX, cy: centerY };
			case "left":
				return { cx: endX, cy: centerY };
			case "down-left":
				return { cx: endX, cy: topY };
			case "down-right":
				return { cx: startX, cy: topY };
		}
	};

	const dims = getDimensions();
	const circlePos = getCirclePosition();

	return (
		<svg
			width={dims.width}
			height={dims.height}
			viewBox={`0 0 ${dims.width} ${dims.height}`}
			className="shrink-0"
			aria-hidden="true"
		>
			{/* Dashed line path */}
			<path
				d={getPath()}
				fill="none"
				stroke={STROKE_COLOR}
				strokeWidth={STROKE_WIDTH}
				strokeDasharray="8 6"
			/>
			{/* Circle at connection point */}
			<circle
				cx={circlePos.cx}
				cy={circlePos.cy}
				r={CIRCLE_RADIUS}
				fill="white"
				stroke={STROKE_COLOR}
				strokeWidth={STROKE_WIDTH}
			/>
		</svg>
	);
};

const Hero = () => {
	const [isDemoHovered, setIsDemoHovered] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const ovalContainerRef = useRef<HTMLDivElement>(null);

	// Track scroll progress through the section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	// ============ PHASE 1: Oval Expansion ============
	const ovalScaleX = useTransform(scrollYProgress, [0, 0.25], [1, 3]);
	const ovalScaleY = useTransform(scrollYProgress, [0, 0.25], [1, 3.5]);
	const borderRadius = useTransform(scrollYProgress, [0, 0.2], [200, 100]);
	const ovalY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-50%"]);

	// ============ Image Clip-Path Transition ============
	// Initial: Show center-right (charts area, no sidebar) - clip left 6%
	// Final: Show left portion (sidebar + content) - clip right 20%
	// Widened scroll range [0.05, 0.12] for smoother, more linear transition
	const clipRight = useTransform(scrollYProgress, [0.05, 0.12], [0, 43]);
	const clipLeft = useTransform(scrollYProgress, [0.05, 0.12], [13, 0]);

	// Centering compensation: translate = (clipRight - clipLeft) / 2
	// Initial: (0 - 6) / 2 = -3% (shift left to center the right portion)
	// Final: (20 - 0) / 2 = 10% (shift right to center the left portion)
	const imageTranslateX = useTransform(
		scrollYProgress,
		[0.05, 0.12],
		["-6.5%", "22%"],
	);

	// Vertical position: start with top overflow, animate to normal
	const imageWrapperY = useTransform(
		scrollYProgress,
		[0.05, 0.12],
		["-20%", "-12%"],
	);

	// Counter-scale for images
	const imageCounterScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.4]);

	// ============ PHASE 2: Transition ============
	const ovalSectionOpacity = useTransform(scrollYProgress, [0.15, 0.2], [1, 0]);
	const sidebarSectionOpacity = useTransform(
		scrollYProgress,
		[0.15, 0.2],
		[0, 1],
	);

	// ============ PHASE 3: Scroll through Sidebar Section ============
	const sidebarSectionY = useTransform(
		scrollYProgress,
		[0.2, 1.0],
		["0vh", "-200vh"],
	);

	// ============ TOOLTIP CLIP-PATH ANIMATIONS ============
	// REVERSED direction: reveals FROM the circle (sidebar edge) OUTWARD to text

	// Tooltip 1: "Keep track of the most important data" - RIGHT of General
	const tooltip1ClipProgress = useTransform(
		scrollYProgress,
		[0.21, 0.26],
		[100, 0],
	);

	// Tooltip 2: "Manage everything" - LEFT of Restaurant
	const tooltip2ClipProgress = useTransform(
		scrollYProgress,
		[0.25, 0.3],
		[100, 0],
	);

	// Tooltip 3: "Full Stock overview" - RIGHT of Articole
	const tooltip3ClipProgress = useTransform(
		scrollYProgress,
		[0.29, 0.34],
		[100, 0],
	);

	// Tooltip 4: "Custom dashboard" - DOWN-LEFT of Creaza Dashboard
	const tooltip4ClipProgress = useTransform(
		scrollYProgress,
		[0.36, 0.41],
		[100, 0],
	);

	// Tooltip 5: "Manage your account with ease" - DOWN-RIGHT of Administrator
	const tooltip5ClipProgress = useTransform(
		scrollYProgress,
		[0.65, 0.7],
		[100, 0],
	);

	return (
		<>
			{/* ==================== HERO SECTION WITH OVAL ==================== */}
			<section ref={sectionRef} className="relative h-[400vh] w-full">
				{/* Sticky container for hero */}
				<div className="sticky top-0 min-h-svh w-full flex items-center justify-center overflow-hidden">
					{/* Background Pattern */}
					<div
						className="absolute inset-0 w-full h-full bg-center bg-no-repeat pointer-events-none"
						style={{
							backgroundImage: `url(${backgroundPattern})`,
							backgroundSize: "cover",
							filter: "saturate(1.5) contrast(1.2) brightness(0.9)",
						}}
					/>

					{/* ===== Oval Section Content (fades out) ===== */}
					<motion.div
						className="absolute inset-0 w-full h-full flex items-center justify-center"
						style={{ opacity: ovalSectionOpacity }}
					>
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
							<div className="hero-oval-container relative w-[92%] sm:w-[90%] md:w-[88%] lg:w-[85%] max-w-5xl mx-auto">
								<motion.div
									ref={ovalContainerRef}
									className="relative w-full bg-[#F0F0F0] overflow-hidden rounded-[200px] z-30 origin-center"
									style={{
										aspectRatio: "23 / 11",
										scaleX: ovalScaleX,
										scaleY: ovalScaleY,
										borderRadius: borderRadius,
										y: ovalY,
									}}
								>
									{/* Dashboard Image with Clip-Path Transition */}
									<motion.div
										className="absolute inset-0 w-full h-full origin-top"
										style={{
											scale: imageCounterScale,
										}}
									>
										{/* Wrapper with shadow - drop-shadow respects clipped shape inside */}
										<motion.div
											className={`absolute w-[80%] left-1/2 transform -translate-x-1/2 transition-[filter] duration-200 ${isDemoHovered ? "blur-md" : ""}`}
											style={{
												y: imageWrapperY,
												filter: `
													drop-shadow(0px 4.35px 10.14px rgba(0, 0, 0, 0.39))
													drop-shadow(0px 18.84px 18.84px rgba(0, 0, 0, 0.33))
													drop-shadow(0px 42.02px 25.36px rgba(0, 0, 0, 0.2))
													drop-shadow(0px 74.63px 29.71px rgba(0, 0, 0, 0.06))
													drop-shadow(0px 116.65px 32.6px rgba(0, 0, 0, 0.01))
												`,
											}}
										>
											{/* Image with clip-path and centering translation */}
											<motion.img
												src={dashboardImage}
												alt="Dashboard Preview"
												className="w-full h-auto rounded-md sm:rounded-lg lg:rounded-xl"
												style={{
													x: imageTranslateX,
													clipPath: useTransform(
														[clipRight, clipLeft],
														([right, left]) =>
															`inset(0% ${right}% 0% ${left}% round 8px)`,
													),
												}}
											/>
										</motion.div>

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
								</motion.div>
							</div>
						</div>

						{/* Hero Footer */}
						<motion.div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 bottom-4 sm:bottom-6 lg:bottom-8 flex items-end justify-between gap-4">
							{/* Left Side - Used By */}
							<div className="flex flex-col items-start gap-0.5 text-sm sm:text-base md:text-lg lg:text-xl shrink-0">
								<span className="font-light text-gray-400">Used By</span>
								<span className="font-light text-black">Untold</span>
							</div>

							{/* Center - Description */}
							<div className="hidden lg:block flex-1 max-w-xl xl:max-w-2xl text-center mx-4 lg:mx-6 xl:mx-8">
								<p className="text-gray-400 font-light text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
									Unlock instant analytics and reporting for your WMEnterprise
									data.
									<br className="hidden lg:block" /> No setup headaches, just
									powerful insights, ready to go
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
					</motion.div>

					{/* ===== Sidebar Section (fades in and scrolls) ===== */}
					<motion.div
						className="absolute inset-x-0 w-full h-[300vh] pointer-events-none"
						style={{
							opacity: sidebarSectionOpacity,
							y: sidebarSectionY,
							top: 0,
						}}
					>
						{/* Gradient Background */}
						<div
							className="absolute inset-0 w-full h-full"
							style={{
								background:
									"linear-gradient(to bottom, #F0F0F0 0%, #FFFFFF 90%)",
							}}
						/>

						{/* Main positioning container - this is the reference for tooltip positioning */}
						<div
							className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
							style={{
								width: "40vw",
								minWidth: "320px",
								maxWidth: "500px",
								top: "10%",
							}}
						>
							{/* Wrapper with overflow-visible for tooltips */}
							<div className="relative">
								{/* Outer card container with gray border */}
								<div className="bg-gray-50 border border-gray-200 rounded-[50px] p-5 sm:p-7.5">
									{/* Inner container with sidebar image */}
									<div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden">
										<img
											src={sidebarOnlyImage}
											alt="Sidebar Preview"
											className="w-full h-auto rounded-[40px]"
										/>
									</div>
								</div>

								{/* ===== TOOLTIPS - Positioned OUTSIDE the card ===== */}

								{/* Tooltip 1: "Keep track of the most important data" - RIGHT of General */}
								{/* General button is at ~19% from top of the outer card */}
								<motion.div
									className="absolute hidden md:flex flex-col pointer-events-none z-10"
									style={{
										top: "16.1%",
										left: "calc(100% - 35px)",
										clipPath: useTransform(
											tooltip1ClipProgress,
											(v) => `inset(0 ${v}% 0 0)`,
										),
									}}
								>
									<div className="flex items-center">
										<TooltipConnector direction="right-1" lineLength={220} />
										<span className="text-[#B3B3B3] font-semibold whitespace-nowrap text-xl lg:text-3xl ml-4">
											Keep track of the most
										</span>
									</div>
									<span
										className="text-[#B3B3B3] font-semibold whitespace-nowrap text-xl lg:text-3xl"
										style={{ marginLeft: "calc(242px + 1rem)" }}
									>
										important data
									</span>
								</motion.div>

								{/* Tooltip 2: "Manage everything" - LEFT of Restaurant */}
								{/* Restaurant button is at ~26% from top of the outer card */}
								<motion.div
									className="absolute hidden md:flex items-center pointer-events-none z-10"
									style={{
										top: "19.8%",
										right: "calc(100% - 35px)",
										clipPath: useTransform(
											tooltip2ClipProgress,
											(v) => `inset(0 0 0 ${v}%)`,
										),
									}}
								>
									<span className="text-[#B3B3B3] font-semibold text-xl lg:text-3xl whitespace-nowrap mr-4">
										Manage everything
									</span>
									<TooltipConnector direction="left" lineLength={120} />
								</motion.div>

								{/* Tooltip 3: "Full Stock overview" - RIGHT of Articole */}
								{/* Articole button is at ~33% from top of the outer card */}
								<motion.div
									className="absolute hidden md:flex items-center pointer-events-none z-10"
									style={{
										top: "23.5%",
										left: "calc(100% - 35px)",
										clipPath: useTransform(
											tooltip3ClipProgress,
											(v) => `inset(0 ${v}% 0 0)`,
										),
									}}
								>
									<TooltipConnector direction="right-2" lineLength={140} />
									<span className="text-[#B3B3B3] font-semibold text-xl lg:text-3xl whitespace-nowrap ml-4">
										Full stock overview
									</span>
								</motion.div>

								{/* Tooltip 4: "Custom dashboard" - UP-LEFT of Creaza Dashboard */}
								{/* Circle near Creaza Dashboard, text extends left and down */}
								<motion.div
									className="absolute hidden md:flex items-end pointer-events-none z-10"
									style={{
										top: "48%",
										right: "calc(100% - 78px)",
										clipPath: useTransform(
											tooltip4ClipProgress,
											(v) => `inset(0 0 0 ${v}%)`,
										),
									}}
								>
									<span className="text-[#B3B3B3] font-semibold text-xl lg:text-3xl whitespace-nowrap mr-4 -mb-1">
										Custom dashboard
									</span>
									<TooltipConnector
										direction="down-left"
										lineLength={200}
										verticalLength={40}
									/>
								</motion.div>

								{/* Tooltip 5: "Manage your account with ease" - DOWN-RIGHT of Administrator */}
								{/* Administrator footer is at ~92% from top */}
								<motion.div
									className="absolute hidden md:flex flex-col pointer-events-none z-10"
									style={{
										top: "97.7%",
										left: "14%",
										clipPath: useTransform(
											tooltip5ClipProgress,
											(v) => `inset(0 ${v}% 0 0)`,
										),
									}}
								>
									<div className="flex items-end">
										<TooltipConnector
											direction="down-right"
											lineLength={200}
											verticalLength={90}
										/>
										<span className="text-[#B3B3B3] font-semibold text-2xl lg:text-4xl whitespace-nowrap ml-4 -mb-1">
											Manage your
										</span>
									</div>
									<span
										className="text-[#B3B3B3] font-semibold text-2xl lg:text-4xl whitespace-nowrap"
										style={{ marginLeft: "calc(222px + 1rem)" }}
									>
										account with ease
									</span>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
};

export default Hero;
