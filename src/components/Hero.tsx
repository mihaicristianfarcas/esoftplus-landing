import { memo, useCallback, useEffect, useRef, useState } from "react";

import { ArrowUpRight, Hexagon } from "lucide-react";
import dashboardImage from "../assets/dashboard.jpg";
import backgroundPattern from "../assets/gradient-hero.png";

// --- Constants ---

const CONNECTOR_CIRCLE_RADIUS = 9;
const CONNECTOR_STROKE_WIDTH = 2;
const CONNECTOR_PADDING = CONNECTOR_STROKE_WIDTH;
const CONNECTOR_CORNER_RADIUS = 10;
const CONNECTOR_STROKE_COLOR = "#D1D5DB";

// Default prop values hoisted to avoid breaking memoization
const DEFAULT_LINE_LENGTH = 150;
const DEFAULT_VERTICAL_LENGTH = 50;

// Initial CSS custom properties for scroll-driven animations
const INITIAL_CSS_VARS = {
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
	"--frame-opacity": "0",
} as React.CSSProperties;

// --- Helpers ---

// Linearly interpolate a value within a clamped scroll range
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

// --- SVG Tooltip Connector ---

interface TooltipConnectorProps {
	direction: "right-1" | "right-2" | "left" | "down-left" | "down-right";
	lineLength?: number;
	verticalLength?: number;
}

// Memoized to skip re-renders when props are stable
const TooltipConnector = memo(function TooltipConnector({
	direction,
	lineLength = DEFAULT_LINE_LENGTH,
	verticalLength = DEFAULT_VERTICAL_LENGTH,
}: TooltipConnectorProps) {
	const R = CONNECTOR_CIRCLE_RADIUS;
	const P = CONNECTOR_PADDING;

	const isVertical = direction === "down-left" || direction === "down-right";
	const width = lineLength + R * 2 + P * 2;
	const height = isVertical ? verticalLength + R * 2 + P * 2 : R * 2 + P * 2;

	const startX = R + P;
	const endX = width - R - P;
	const centerY = height / 2;
	const topY = R + P;
	const bottomY = height - R - P;
	const CR = CONNECTOR_CORNER_RADIUS;

	// Build SVG path based on connector direction
	let path: string;
	let cx: number;
	let cy: number;

	switch (direction) {
		case "right-1":
		case "right-2":
			path = `M ${startX} ${centerY} H ${endX}`;
			cx = startX;
			cy = centerY;
			break;
		case "left":
			path = `M ${endX} ${centerY} H ${startX}`;
			cx = endX;
			cy = centerY;
			break;
		case "down-left":
			path = `M ${endX} ${topY} V ${bottomY - CR} Q ${endX} ${bottomY}, ${endX - CR} ${bottomY} H ${startX}`;
			cx = endX;
			cy = topY;
			break;
		case "down-right":
			path = `M ${startX} ${topY} V ${bottomY - CR} Q ${startX} ${bottomY}, ${startX + CR} ${bottomY} H ${endX}`;
			cx = startX;
			cy = topY;
			break;
	}

	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			className="shrink-0"
			aria-hidden="true"
		>
			<path
				d={path}
				fill="none"
				stroke={CONNECTOR_STROKE_COLOR}
				strokeWidth={CONNECTOR_STROKE_WIDTH}
				strokeDasharray="8 6"
			/>
			<circle
				cx={cx}
				cy={cy}
				r={R}
				fill="white"
				stroke={CONNECTOR_STROKE_COLOR}
				strokeWidth={CONNECTOR_STROKE_WIDTH}
			/>
		</svg>
	);
});

// --- Main Hero Component ---

const Hero = () => {
	const [isDemoHovered, setIsDemoHovered] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const ovalContainerRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);
	// Track last progress in ref to avoid unnecessary DOM updates
	const lastProgressRef = useRef<number>(0);

	// Drive all animations via CSS custom properties for GPU-accelerated transforms
	const updateScrollStyles = useCallback((progress: number) => {
		const section = sectionRef.current;
		if (!section) return;

		const style = section.style;

		// Phase 1: Oval expansion (0 -> 0.5)
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

		// Counter-scale image to prevent distortion from non-uniform oval scaling
		style.setProperty("--image-scale-x", String(ovalScaleY / ovalScaleX));
		style.setProperty("--image-scale-y", String(1));

		// Phase 1-2: Image vertical parallax with 3-stage easing
		const imageY =
			progress < 0.15
				? interpolate(progress, [0, 0.15], [-20, 0])
				: progress < 0.5
					? interpolate(progress, [0.15, 0.5], [0, 50])
					: interpolate(progress, [0.5, 1.0], [50, -50]);
		style.setProperty("--image-y", `${imageY}%`);

		// Image clip-path: reveal mobile view by cropping sides
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

		// Phase 2: Sidebar scroll (0.5 -> 1.0)
		style.setProperty(
			"--sidebar-y",
			`${interpolate(progress, [0.5, 1.0], [0, -150])}vh`,
		);

		// Oval background fades to white
		style.setProperty(
			"--oval-bg-opacity",
			`${interpolate(progress, [0.5, 1.0], [0, 1])}`,
		);

		// Frame container fades in at ~0.5
		style.setProperty(
			"--frame-opacity",
			`${interpolate(progress, [0.48, 0.55], [0, 1])}`,
		);

		// Phase 2-3: Tooltip reveal staggered from 0.5 to 0.9
		style.setProperty(
			"--tooltip1-clip",
			`${interpolate(progress, [0.5, 0.55], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip2-clip",
			`${interpolate(progress, [0.53, 0.58], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip3-clip",
			`${interpolate(progress, [0.56, 0.61], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip4-clip",
			`${interpolate(progress, [0.63, 0.68], [100, 0])}%`,
		);
		style.setProperty(
			"--tooltip5-clip",
			`${interpolate(progress, [0.85, 0.9], [100, 0])}%`,
		);
	}, []);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		updateScrollStyles(0);

		const handleScroll = () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}

			rafRef.current = requestAnimationFrame(() => {
				const rect = section.getBoundingClientRect();
				const sectionHeight = section.offsetHeight;
				const viewportHeight = window.innerHeight;

				// Progress: 0 at section top, 1 when bottom reaches viewport top
				const scrolled = -rect.top;
				const totalScrollable = sectionHeight - viewportHeight;
				const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

				// Only update DOM when progress changes meaningfully
				if (Math.abs(progress - lastProgressRef.current) > 0.0001) {
					lastProgressRef.current = progress;
					updateScrollStyles(progress);
				}
			});
		};

		// Passive listener for scroll perf
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

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
			style={INITIAL_CSS_VARS}
		>
			{/* Sticky viewport container */}
			<div className="sticky top-0 min-h-svh w-full flex items-center justify-center overflow-hidden">
				{/* Background pattern */}
				<div
					className="absolute inset-0 w-full h-full bg-center bg-no-repeat pointer-events-none"
					style={{
						backgroundImage: `url(${backgroundPattern})`,
						backgroundSize: "cover",
						filter: "saturate(1.5) contrast(1.2) brightness(0.9)",
					}}
				/>

				{/* Oval section content */}
				<div
					className="absolute inset-0 w-full h-full flex items-center justify-center will-change-[opacity]"
					style={{ opacity: "var(--oval-section-opacity)" }}
				>
					{/* Hero content: heading, CTAs, animated oval */}
					<div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32 pb-24 sm:pb-28 md:pb-32 text-center">
						<p className="text-gray-400 mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-xl animate-fade-in">
							Unlock full potential.
						</p>

						<h1 className="hero-title mb-6 sm:mb-10 md:mb-14 lg:mb-16 xl:mb-28 tracking-tighter">
							Mobilize Your ERP
						</h1>

						{/* CTA buttons */}
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

						{/* Dashboard image in scroll-animated oval */}
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
								{/* Image layer with counter-scale to offset oval distortion */}
								<div
									className="absolute inset-0 w-full h-full origin-top will-change-transform"
									style={{
										transform:
											"scaleX(var(--image-scale-x)) scaleY(var(--image-scale-y))",
									}}
								>
									{/* Dashboard image with clip-path and blur-on-hover */}
									<div
										className="absolute w-[85%] left-1/2 transition-[filter] duration-200 will-change-[transform,filter]"
										style={{
											transform: "translateX(-50%) translateY(var(--image-y))",
											filter: isDemoHovered ? "blur(12px)" : undefined,
										}}
									>
										{/* Frame overlay */}
										<div
											className="absolute will-change-[opacity]"
											style={{
												opacity: "var(--frame-opacity)",
												left: "calc(var(--image-x) - 1%)",
												top: "-2%",
												width: "15%",
												height: "104%",
											}}
										>
											<div className="w-full h-full bg-white border-[0.5px] border-gray-300 rounded-xl" />
										</div>

										{/* Clipped dashboard image */}
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

										{/* Tooltip annotations — counter-scaled to natural size */}
										<div
											className="absolute pointer-events-none will-change-[opacity]"
											style={{
												opacity: "var(--frame-opacity)",
												// Counter the ~4.5x parent scaling so tooltips render at natural size
												transform: "scale(0.222)",
												transformOrigin: "top left",
												left: "0",
												top: "0",
												width: "450%",
												height: "450%",
											}}
										>
											{/* Tooltip 1: Keep track of the most important data — RIGHT side, multi-line */}
											<div
												className="absolute hidden md:flex flex-col"
												style={{
													top: "15%",
													left: "calc(var(--image-x) + 12.7%)",
													clipPath: "inset(0 var(--tooltip1-clip) 0 0)",
												}}
											>
												<div className="flex items-center">
													<TooltipConnector
														direction="right-1"
														lineLength={220}
													/>
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
											</div>

											{/* Tooltip 2: Manage everything — LEFT side */}
											<div
												className="absolute hidden md:flex items-center"
												style={{
													top: "18.8%",
													left: "calc(var(--image-x) + 0.4%)",
													transform: "translateX(-100%)",
													clipPath: "inset(0 0 0 var(--tooltip2-clip))",
												}}
											>
												<span className="text-[#B3B3B3] font-semibold text-xl lg:text-3xl whitespace-nowrap mr-4">
													Manage everything
												</span>
												<TooltipConnector direction="left" lineLength={120} />
											</div>

											{/* Tooltip 3: Full stock overview — RIGHT side */}
											<div
												className="absolute hidden md:flex items-center"
												style={{
													top: "22.6%",
													left: "calc(var(--image-x) + 12.7%)",
													clipPath: "inset(0 var(--tooltip3-clip) 0 0)",
												}}
											>
												<TooltipConnector
													direction="right-2"
													lineLength={140}
												/>
												<span className="text-[#B3B3B3] font-semibold text-xl lg:text-3xl whitespace-nowrap ml-4">
													Full stock overview
												</span>
											</div>

											{/* Tooltip 4: Custom dashboard — LEFT side, angled down-left */}
											<div
												className="absolute hidden md:flex items-end"
												style={{
													top: "48%",
													left: "var(--image-x)",
													transform: "translateX(-89%)",
													clipPath: "inset(0 0 0 var(--tooltip4-clip))",
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
											</div>

											{/* Tooltip 5: Manage your account with ease — BOTTOM, angled down-right, multi-line */}
											<div
												className="absolute hidden md:flex flex-col"
												style={{
													top: "97.7%",
													left: "44.8%",
													clipPath: "inset(0 var(--tooltip5-clip) 0 0)",
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
											</div>
										</div>
									</div>

									{/* "Enter" button overlay on demo hover */}
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

					{/* Hero footer: stats, tagline, scroll indicator */}
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
