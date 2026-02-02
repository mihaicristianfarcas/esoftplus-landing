import { useEffect, useRef, useState } from "react";
import DashboardPreviewCard from "./sections/DashboardPreviewCard";
import FeatureTagCard from "./sections/FeatureTagCard";
import TrackingCard from "./sections/TrackingCard";

const FeaturesCarousel = () => {
	// Feature data for FeatureTagCard
	const features = [
		["Dashboards", "Tracking", "Bank Syncing", "Sales Count", "Dashboards"],
		["Tracking", "Bank Syncing", "Partners Tracking", "& More"],
	];

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	// Cache scroll calculation values to avoid recalculating on every scroll
	const scrollMetricsRef = useRef<{
		maxScroll: number;
		containerHeight: number;
		initialized: boolean;
	}>({ maxScroll: 0, containerHeight: 0, initialized: false });

	// Keyboard navigation state
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [keyboardMode, setKeyboardMode] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		const scrollContainer = scrollContainerRef.current;
		if (!container || !scrollContainer) return;

		// Cache card elements and calculate metrics once
		const initializeScrollMetrics = () => {
			// Get all card elements by direct children (more reliable than class selectors)
			const cards = Array.from(scrollContainer.children).filter(
				(child) =>
					child.classList.contains("flex-none") &&
					child.getAttribute("data-card") === "true",
			) as HTMLElement[];

			if (cards.length === 0) return false;

			const firstCard = cards[0];
			const lastCard = cards[cards.length - 1];

			// Cache DOM measurements (js-cache-property-access)
			const firstCardLeft = firstCard.offsetLeft;
			const lastCardLeft = lastCard.offsetLeft;
			const containerHeight = container.offsetHeight;
			const windowHeight = window.innerHeight;

			scrollMetricsRef.current = {
				maxScroll: lastCardLeft - firstCardLeft,
				containerHeight: containerHeight - windowHeight,
				initialized: true,
			};

			return true;
		};

		const handleScroll = () => {
			// Disable keyboard mode when user scrolls with mouse/touch
			setKeyboardMode(false);

			// Cache getBoundingClientRect result (js-cache-property-access)
			const rect = container.getBoundingClientRect();
			const rectTop = rect.top;
			const rectBottom = rect.bottom;
			const windowHeight = window.innerHeight;

			// Early exit if not in scroll range (js-early-exit)
			if (rectTop > 0 || rectBottom <= windowHeight) {
				return;
			}

			// Initialize metrics on first scroll if not done
			if (!scrollMetricsRef.current.initialized) {
				const success = initializeScrollMetrics();
				if (!success) return; // Early exit if initialization failed
			}

			// Use cached values for calculation
			const { maxScroll, containerHeight } = scrollMetricsRef.current;

			// Calculate scroll progress through the section (0 to 1)
			// Using Math.min/max to clamp the value for consistent behavior
			const scrollProgress = Math.max(
				0,
				Math.min(1, Math.abs(rectTop) / containerHeight),
			);

			// Apply smooth horizontal scroll with clamping
			const targetScroll = scrollProgress * maxScroll;
			scrollContainer.scrollLeft = targetScroll;
		};

		// Initialize metrics after a brief delay to ensure layout is complete
		const timeoutId = setTimeout(() => {
			initializeScrollMetrics();
		}, 100);

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener("scroll", handleScroll);
			clearTimeout(timeoutId);
		};
	}, []);

	// Keyboard navigation handlers
	const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
		if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;

		setKeyboardMode(true);
		e.preventDefault();

		const totalCards = 4;
		let newIndex = activeCardIndex;

		switch (e.key) {
			case "ArrowLeft":
				newIndex = Math.max(0, activeCardIndex - 1);
				break;
			case "ArrowRight":
				newIndex = Math.min(totalCards - 1, activeCardIndex + 1);
				break;
			case "Home":
				newIndex = 0;
				break;
			case "End":
				newIndex = totalCards - 1;
				break;
		}

		if (newIndex !== activeCardIndex) {
			setActiveCardIndex(newIndex);
			scrollToCard(newIndex);
		}
	};

	const scrollToCard = (index: number) => {
		if (!scrollContainerRef.current) return;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const cards = Array.from(scrollContainerRef.current.children).filter(
			(child) => child.getAttribute("data-card") === "true",
		);
		const targetCard = cards[index];
		if (targetCard) {
			targetCard.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
				block: "nearest",
				inline: "start",
			});
			if (targetCard instanceof HTMLElement) {
				targetCard.focus();
			}
		}
	};

	const handleCardFocus = (index: number) => {
		setActiveCardIndex(index);
		setKeyboardMode(true);
	};

	const cardsData = [
		{
			id: "feature-tag",
			component: (
				<FeatureTagCard
					variant="dark"
					title="Everything you need, all in one place."
					subtitle="Centralise"
					features={features}
				/>
			),
		},
		{ id: "tracking", component: <TrackingCard /> },
		{
			id: "dashboard-light",
			component: <DashboardPreviewCard variant="light" />,
		},
		{
			id: "dashboard-dark",
			component: <DashboardPreviewCard variant="dark" />,
		},
	];

	return (
		<div
			ref={containerRef}
			style={{
				// Height determines how long the scroll-jacking lasts
				// 4 cards = 400vh to give smooth scrolling through each card
				height: "400vh",
				position: "relative",
			}}
		>
			<section className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
				{/* Header - constrained width */}
				<div className="max-w-[1280px] px-6 mx-auto w-full">
					<h2 className="section-title mb-6 lg:mb-12">
						Everything you <br className="hidden sm:block" />
						need, <span className="text-gray-400">all in one place.</span>
					</h2>
				</div>

				{/* Carousel - left-aligned with heading, extends to right edge */}
				<div className="w-full overflow-hidden">
					<div
						ref={scrollContainerRef}
						className="flex gap-4 lg:gap-6 overflow-x-hidden scrollbar-hide"
						style={{
							paddingLeft: "max(1.5rem, calc((100% - 1280px) / 2 + 1.5rem))",
							paddingRight: "1.5rem",
						}}
						role="region"
						aria-label="Features carousel"
						onKeyDown={handleCarouselKeyDown}
						tabIndex={-1}
					>
						{cardsData.map((cardData, index) => (
							<div
								key={cardData.id}
								className="flex-none w-[85vw] sm:w-[540px] h-[560px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-4 rounded-3xl"
								data-card="true"
								tabIndex={keyboardMode && index === activeCardIndex ? 0 : -1}
								onFocus={() => handleCardFocus(index)}
								role="group"
								aria-label={`Feature ${index + 1} of 4`}
							>
								{cardData.component}
							</div>
						))}
						{/* Spacer to allow last element to scroll to starting position */}
						<div
							className="flex-none"
							style={{
								width: "calc(100vw - min(100vw, 1280px) / 2)",
							}}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

// Static CSS injected once at module level (rendering-hoist-jsx optimization)
// This ensures the style is only created once, not on every component render
const styleId = "scrollbar-hide-styles";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
	const style = document.createElement("style");
	style.id = styleId;
	style.textContent = `.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`;
	document.head.appendChild(style);
}

export default FeaturesCarousel;
