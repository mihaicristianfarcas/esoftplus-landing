import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowUpRight, Hexagon } from "lucide-react";
import dashboardImage from "../assets/dashboard.jpg";
import backgroundPattern from "../assets/gradient-hero.png";

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
	const PADDING = STROKE_WIDTH;
	const CORNER_RADIUS = 10;
	const STROKE_COLOR = "#D1D5DB";

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
				return `M ${startX} ${centerY} H ${endX}`;
			case "left":
				return `M ${endX} ${centerY} H ${startX}`;
			case "down-left":
				return `M ${endX} ${topY}
						V ${bottomY - CORNER_RADIUS}
						Q ${endX} ${bottomY}, ${endX - CORNER_RADIUS} ${bottomY}
						H ${startX}`;
			case "down-right":
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
			<path
				d={getPath()}
				fill="none"
				stroke={STROKE_COLOR}
				strokeWidth={STROKE_WIDTH}
				strokeDasharray="8 6"
			/>
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

// Helper: interpolate a value based on scroll progress within a range
const interpolate = (
	progress: number,
	inputRange: [number, number],
	outputRange: [number, number],
): number => {
	const [inputStart, inputEnd] = inputRange;
	const [outputStart, outputEnd] = outputRange;

	if (progress <= inputStart) return outputStart;
	if (progress >= inputEnd) return outputEnd;

	const ratio = (progress - inputStart) / (inputEnd - inputStart);
	return outputStart + ratio * (outputEnd - outputStart);
};

const Hero = () => {
	const [isDemoHovered, setIsDemoHovered] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const ovalContainerRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);
	const lastProgressRef = useRef<number>(0);

	// Update CSS custom properties based on scroll progress
	const updateScrollStyles = useCallback((progress: number) => {
		const section = sectionRef.current;
		if (!section) return;

		// Use CSS custom properties for GPU-accelerated animations
		const style = section.style;

		// Calculate oval scale values
		const ovalScaleX = interpolate(progress, [0, 0.5], [1, 3]);
		const ovalScaleY = interpolate(progress, [0, 0.5], [1, 4.5]);

		style.setProperty("--oval-scale-x", String(ovalScaleX));
		style.setProperty("--oval-scale-y", String(ovalScaleY));
		style.setProperty(
			"--oval-border-radius",
			`${interpolate(progress, [0, 0.5], [200, 100])}px`,
		);
		style.setProperty(
			"--oval-y",
			`${interpolate(progress, [0, 0.5], [0, -50])}%`,
		);

		// Counter-scale the image to prevent distortion from non-uniform oval scaling
		style.setProperty("--image-scale-x", String(ovalScaleY / ovalScaleX));
		style.setProperty("--image-scale-y", String(1));

		const imageY =
			progress < 0.15
				? interpolate(progress, [0, 0.15], [-20, 0])
				: progress < 0.5
					? interpolate(progress, [0.15, 0.5], [0, 50])
					: interpolate(progress, [0.5, 1.0], [50, -50]);

		style.setProperty("--image-y", `${imageY}%`);

		style.setProperty(
			"--clip-right",
			`${interpolate(progress, [0.05, 0.5], [0, 87])}%`,
		);
		style.setProperty(
			"--clip-left",
			`${interpolate(progress, [0.05, 0.25], [13, 0])}%`,
		);
		const imageX =
			progress < 0.25
				? interpolate(progress, [0.05, 0.25], [-6.5, 20])
				: interpolate(progress, [0.25, 0.5], [20, 43.5]);
		style.setProperty("--image-x", `${imageX}%`);

		// Phase 3: Sidebar scroll (0.5 -> 1.0)
		style.setProperty(
			"--sidebar-y",
			`${interpolate(progress, [0.5, 1.0], [0, -150])}vh`,
		);

		// Oval background gradient - transition to white from 0.5 to 1.0
		style.setProperty(
			"--oval-bg-opacity",
			`${interpolate(progress, [0.5, 1.0], [0, 1])}`,
		);

		// Phone frame container - fade in at 0.5
		style.setProperty(
			"--phone-frame-opacity",
			`${interpolate(progress, [0.48, 0.55], [0, 1])}`,
		);

		// Tooltip clip-path animations - Start after sidebar is visible
		style.setProperty(
			"--tooltip1-clip",
			`${interpolate(progress, [0.5, 0.6], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip2-clip",
			`${interpolate(progress, [0.55, 0.65], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip3-clip",
			`${interpolate(progress, [0.6, 0.65], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip4-clip",
			`${interpolate(progress, [0.65, 0.7], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip5-clip",
			`${interpolate(progress, [0.7, 0.75], [100, 0])}%`,
		);
	}, []);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		// Initialize CSS custom properties
		updateScrollStyles(0);

		const handleScroll = () => {
			// Cancel any pending RAF to avoid stacking
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}

			rafRef.current = requestAnimationFrame(() => {
				const rect = section.getBoundingClientRect();
				const sectionHeight = section.offsetHeight;
				const viewportHeight = window.innerHeight;

				// Calculate progress: 0 when section top is at viewport top,
				// 1 when section bottom reaches viewport top
				const scrolled = -rect.top;
				const totalScrollable = sectionHeight - viewportHeight;
				const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

				// Only update if progress changed significantly (reduces repaints)
				if (Math.abs(progress - lastProgressRef.current) > 0.0001) {
					lastProgressRef.current = progress;
					updateScrollStyles(progress);
				}
			});
		};

		// Use passive listener for better scroll performance
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial call

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [updateScrollStyles]);

	return (
		<section
			ref={sectionRef}
			className="relative h-[400vh] w-full"
			style={
				{
					// Initialize CSS custom properties with defaults
					"--oval-scale-x": "1",
					"--oval-scale-y": "1",
					"--oval-border-radius": "200px",
					"--oval-y": "0%",
					"--clip-right": "0%",
					"--clip-left": "13%",
					"--image-x": "-6.5%",
					"--image-y": "-20%",
					"--image-scale-x": "1",
					"--image-scale-y": "1",
					"--oval-section-opacity": "1",
					"--sidebar-section-opacity": "0",
					"--sidebar-y": "0vh",
					"--tooltip1-clip": "100%",
					"--tooltip2-clip": "100%",
					"--tooltip3-clip": "100%",
					"--tooltip4-clip": "100%",
					"--tooltip5-clip": "100%",
					"--oval-bg-opacity": "0",
					"--phone-frame-opacity": "0",
				} as React.CSSProperties
			}
		>
			{/* Sticky container */}
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

				{/* Oval Section Content */}
				<div
					className="absolute inset-0 w-full h-full flex items-center justify-center will-change-[opacity]"
					style={{ opacity: "var(--oval-section-opacity)" }}
				>
					{/* Hero Content */}
					<div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32 pb-24 sm:pb-28 md:pb-32 text-center">
						<p className="text-gray-400 mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-xl animate-fade-in">
							Unlock full potential.
						</p>

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
							<div
								ref={ovalContainerRef}
								className="relative w-full bg-[#F0F0F0] overflow-hidden z-30 origin-center will-change-transform"
								style={{
									aspectRatio: "23 / 11",
									transform:
										"translateY(var(--oval-y)) scaleX(var(--oval-scale-x)) scaleY(var(--oval-scale-y))",
									borderRadius: "var(--oval-border-radius)",
									background: `linear-gradient(to bottom, rgba(255, 255, 255, var(--oval-bg-opacity)), rgba(255, 255, 255, var(--oval-bg-opacity))), #F0F0F0`,
								}}
							>
								{/* Dashboard Image with Clip-Path Transition */}
								<div
									className="absolute inset-0 w-full h-full origin-top will-change-transform"
									style={{
										transform:
											"scaleX(var(--image-scale-x)) scaleY(var(--image-scale-y))",
									}}
								>
									{/* Wrapper with shadow */}
									<div
										className="absolute w-[85%] left-1/2 transition-[filter] duration-200 will-change-[transform,filter]"
										style={{
											transform: "translateX(-50%) translateY(var(--image-y))",
											filter: isDemoHovered ? "blur(12px)" : undefined,
										}}
									>
										{/* Counter-scale wrapper for phone frame - to make it normal size despite parent scaling */}
										<div
											className="absolute will-change-[opacity]"
											style={{
												opacity: "var(--phone-frame-opacity)",
												// Position to wrap around the clipped image
												// At progress 0.5: image-x is 44%, clip shows 13% from left
												left: "calc(var(--image-x) - 0.85%)",
												top: "-1.7%",
												// Counter the 4.5x uniform parent scaling
												transform: "scale(0.222)",
												transformOrigin: "top left",
												// Size needs to be 4.5x larger since we're scaling down
												width: "66%", // 69% * 4.5 = 276%
												height: "466%", // 104% * 4.5
											}}
										>
											{/* White phone frame container */}
											<div
												className="w-full h-full bg-white border-1 border-gray-300 rounded-[50px]"
												style={{
													padding: "6.75%", // 1.5% * 4.5
												}}
											></div>
										</div>

										{/* Image with clip-path */}
										<img
											src={dashboardImage}
											alt="Dashboard Preview"
											className="relative w-full h-auto rounded-[6px] will-change-[transform,clip-path]"
											style={{
												transform: "translateX(var(--image-x))",
												clipPath:
													"inset(0% var(--clip-right) 0% var(--clip-left) round 6px)",
											}}
										/>

										{/* Counter-scale wrapper for tooltips - to make them normal size */}
										<div
											className="absolute pointer-events-none will-change-[opacity]"
											style={{
												opacity: "var(--phone-frame-opacity)",
												// Counter the 4.5x uniform parent scaling
												transform: "scale(0.222)",
												transformOrigin: "top left",
												left: "0",
												top: "0",
												width: "450%", // Scale up to compensate
												height: "450%",
											}}
										>
											{/* Tooltip 1: Manage everything */}
											<div
												className="absolute flex items-center"
												style={{
													// Positions scaled up by 4.5x to compensate for counter-scale
													left: "calc((var(--image-x) + 18%) * 4.5)",
													top: "67.5%", // 15% * 4.5
													clipPath: `inset(0 var(--tooltip1-clip) 0 0)`,
												}}
											>
												<TooltipConnector direction="right-1" lineLength={80} />
												<div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-lg">
													<p className="text-[10px] font-medium text-gray-500 mb-0">
														Manage everything
													</p>
												</div>
											</div>

											{/* Tooltip 2: Keep track of important data */}
											<div
												className="absolute flex items-center"
												style={{
													left: "calc((var(--image-x) + 18%) * 4.5)",
													top: "135%", // 30% * 4.5
													clipPath: `inset(0 var(--tooltip2-clip) 0 0)`,
												}}
											>
												<TooltipConnector
													direction="right-2"
													lineLength={100}
												/>
												<div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-lg">
													<p className="text-[11px] font-semibold text-gray-900">
														Keep track of the most important data
													</p>
												</div>
											</div>

											{/* Tooltip 3: Full Stock overview */}
											<div
												className="absolute flex items-center"
												style={{
													left: "calc((var(--image-x) + 18%) * 4.5)",
													top: "202.5%", // 45% * 4.5
													clipPath: `inset(0 var(--tooltip3-clip) 0 0)`,
												}}
											>
												<TooltipConnector direction="right-1" lineLength={90} />
												<div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-lg">
													<p className="text-[11px] font-semibold text-gray-900">
														Full Stock overview
													</p>
												</div>
											</div>

											{/* Tooltip 4: Partners Management */}
											<div
												className="absolute flex items-center"
												style={{
													left: "calc((var(--image-x) + 18%) * 4.5)",
													top: "270%", // 60% * 4.5
													clipPath: `inset(0 var(--tooltip4-clip) 0 0)`,
												}}
											>
												<TooltipConnector direction="right-2" lineLength={80} />
												<div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-lg">
													<p className="text-[11px] font-semibold text-gray-900">
														Partners Management
													</p>
												</div>
											</div>

											{/* Tooltip 5: Analytics */}
											<div
												className="absolute flex items-center"
												style={{
													left: "calc((var(--image-x) + 18%) * 4.5)",
													top: "337.5%", // 75% * 4.5
													clipPath: `inset(0 var(--tooltip5-clip) 0 0)`,
												}}
											>
												<TooltipConnector direction="right-1" lineLength={85} />
												<div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-lg">
													<p className="text-[11px] font-semibold text-gray-900">
														Analytics Dashboard
													</p>
												</div>
											</div>
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
								</div>
							</div>
						</div>
					</div>

					{/* Hero Footer */}
					<div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 bottom-4 sm:bottom-6 lg:bottom-8 flex items-end justify-between gap-4">
						<div className="flex flex-col items-start gap-0.5 text-sm sm:text-base md:text-lg lg:text-xl shrink-0">
							<span className="font-light text-gray-400">Used By</span>
							<span className="font-light text-black">Untold</span>
						</div>

						<div className="hidden lg:block flex-1 max-w-xl xl:max-w-2xl text-center mx-4 lg:mx-6 xl:mx-8">
							<p className="text-gray-400 font-light text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
								Unlock instant analytics and reporting for your WMEnterprise
								data.
								<br className="hidden lg:block" /> No setup headaches, just
								powerful insights, ready to go
							</p>
						</div>

						<div className="flex flex-col items-center gap-1 sm:gap-1.5 shrink-0">
							<div className="w-5 sm:w-6 lg:w-8 h-10 sm:h-12 lg:h-16 border-2 border-black rounded-full flex items-end justify-center pb-1.5 sm:pb-2">
								<Hexagon className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 fill-black text-black" />
							</div>
							<span className="text-[10px] sm:text-xs lg:text-sm text-black tracking-wider font-medium">
								SCROLL
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
