import { useEffect, useRef, useState } from "react";
import DashboardPreviewCard from "./sections/DashboardPreviewCard";
import FeatureTagCard from "./sections/FeatureTagCard";
import TrackingCard from "./sections/TrackingCard";

const FeaturesCarousel = () => {
	const features = [
		["Dashboards", "Tracking", "Bank Syncing", "Sales Count", "Dashboards"],
		["Tracking", "Bank Syncing", "Partners Tracking", "& More"],
	];

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const stickyRef = useRef<HTMLElement>(null);

	// Keyboard navigation state
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [keyboardMode, setKeyboardMode] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		const scrollContainer = scrollContainerRef.current;
		const sticky = stickyRef.current;
		if (!container || !scrollContainer || !sticky) return;

		// Get all card elements
		const cards = Array.from(scrollContainer.children).filter(
			(child) => child.getAttribute("data-card") === "true",
		) as HTMLElement[];

		// How far the carousel can scroll horizontally: the distance from the first card
		// to the last, so at the end the last card sits where the first card started.
		// Measured on every update rather than cached, because Safari can run this effect
		// before the stylesheet is applied (cards still stacked, distance 0), and web fonts
		// change the card widths again once they load.
		const getScrollableDistance = () => {
			if (cards.length < 2) return 0;
			const firstCard = cards[0];
			const lastCard = cards[cards.length - 1];
			return Math.max(0, lastCard.offsetLeft - firstCard.offsetLeft);
		};

		const handleScroll = () => {
			// Disable keyboard mode when user scrolls
			setKeyboardMode(false);

			// Get the sticky element's position relative to its container
			const containerRect = container.getBoundingClientRect();
			const containerTop = containerRect.top;
			const containerHeight = containerRect.height;
			const viewportHeight = window.innerHeight;

			// Calculate how much of the scroll journey we've completed
			// When containerTop = 0, we're at the start (progress = 0)
			// When containerTop = -(containerHeight - viewportHeight), we're at the end (progress = 1)
			const scrollRange = containerHeight - viewportHeight;

			if (scrollRange <= 0) return;

			// Progress: 0 when sticky section just becomes sticky, 1 when about to unstick
			const progress = Math.max(0, Math.min(1, -containerTop / scrollRange));

			// Apply easing for smoother feel (optional - use linear if you prefer)
			// const easedProgress = easeInOutCubic(progress);
			const easedProgress = progress; // Linear for predictable behavior

			// Set scroll position
			scrollContainer.scrollLeft = easedProgress * getScrollableDistance();
		};

		// Use requestAnimationFrame for smoother updates
		let ticking = false;
		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		// Re-apply the position whenever the card layout changes (stylesheet applied,
		// fonts/images loaded), even if the page hasn't been scrolled since
		const resizeObserver = new ResizeObserver(onScroll);
		cards.forEach((card) => resizeObserver.observe(card));

		// Initial setup
		handleScroll();

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			resizeObserver.disconnect();
		};
	}, []);

	// Keyboard navigation handlers
	const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
		if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;

		setKeyboardMode(true);
		e.preventDefault();

		const totalCards = cardsData.length;
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
		) as HTMLElement[];

		const targetCard = cards[index];
		if (targetCard) {
			targetCard.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
				block: "nearest",
				inline: "start",
			});
			targetCard.focus();
		}
	};

	const handleCardFocus = (index: number) => {
		setActiveCardIndex(index);
		setKeyboardMode(true);
	};

	const cardsData = [
		{
			id: "feature-tag",
			label: "Feature overview",
			component: (
				<FeatureTagCard
					variant="dark"
					title="Everything you need, all in one place."
					subtitle="Centralise"
					features={features}
				/>
			),
		},
		{
			id: "tracking",
			label: "Tracking features",
			component: <TrackingCard />,
		},
		{
			id: "dashboard-light",
			label: "Dashboard light theme",
			component: <DashboardPreviewCard variant="light" />,
		},
		{
			id: "dashboard-dark",
			label: "Dashboard dark theme",
			component: <DashboardPreviewCard variant="dark" />,
		},
	];

	return (
		<div
			ref={containerRef}
			className="relative"
			style={{
				// Height controls scroll duration
				// More height = slower scroll through cards
				height: "300vh",
			}}
		>
			<section
				ref={stickyRef}
				className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden"
			>
				{/* Header */}
				<div className="max-w-[1280px] px-6 mx-auto w-full">
					<h2 className="section-title mb-6 lg:mb-12">
						Everything you <br className="hidden sm:block" />
						need, <span className="text-gray-400">all in one place.</span>
					</h2>
				</div>

				{/* Carousel */}
				<div className="w-full overflow-hidden">
					<div
						ref={scrollContainerRef}
						className="flex gap-4 lg:gap-6 overflow-x-hidden"
						style={{
							// Left padding aligns with the 1280px container
							paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
							paddingRight: "1.5rem",
							// Hide scrollbar cross-browser
							scrollbarWidth: "none",
							msOverflowStyle: "none",
						}}
						role="region"
						aria-label="Features carousel"
						aria-roledescription="carousel"
						onKeyDown={handleCarouselKeyDown}
						tabIndex={-1}
					>
						{cardsData.map((cardData, index) => (
							<div
								key={cardData.id}
								data-card="true"
								className="flex-none rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
								style={{
									// Consistent card sizing across devices
									height: "min(60vh, 560px)",
									maxWidth: "min(85vw, 540px)",
								}}
								tabIndex={keyboardMode && index === activeCardIndex ? 0 : -1}
								onFocus={() => handleCardFocus(index)}
								role="group"
								aria-roledescription="slide"
								aria-label={`${cardData.label}, ${index + 1} of ${cardsData.length}`}
							>
								{cardData.component}
							</div>
						))}

						{/* Spacer: ensures container is wide enough to allow scrolling */}
						<div
							aria-hidden="true"
							className="flex-none"
							style={{ width: "100vw" }}
						/>
					</div>
				</div>

				{/* Optional: Progress indicator */}
				{/* Uncomment if you want visual feedback
				<div className="max-w-[1280px] px-6 mx-auto w-full mt-6">
					<div className="flex gap-2">
						{cardsData.map((_, index) => (
							<div
								key={index}
								className={`h-1 rounded-full transition-all duration-300 ${
									index === activeCardIndex
										? "w-8 bg-white"
										: "w-2 bg-white/30"
								}`}
							/>
						))}
					</div>
				</div>
				*/}
			</section>
		</div>
	);
};

// Webkit scrollbar hiding (injected once)
if (typeof document !== "undefined") {
	const styleId = "carousel-scrollbar-hide";
	if (!document.getElementById(styleId)) {
		const style = document.createElement("style");
		style.id = styleId;
		style.textContent = `
			[data-carousel-scroll]::-webkit-scrollbar { display: none; }
		`;
		document.head.appendChild(style);
	}
}

// Optional easing function if you want smoother scroll feel
// function easeInOutCubic(t: number): number {
// 	return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// }

export default FeaturesCarousel;
