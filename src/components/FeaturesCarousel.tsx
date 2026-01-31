import { useEffect, useRef } from "react";
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

	useEffect(() => {
		const container = containerRef.current;
		const scrollContainer = scrollContainerRef.current;
		if (!container || !scrollContainer) return;

		const handleScroll = () => {
			const rect = container.getBoundingClientRect();
			const containerHeight = container.offsetHeight;
			
			// Start effect when section reaches top of viewport
			if (rect.top <= 0 && rect.bottom > window.innerHeight) {
				// Calculate scroll progress through the section
				const scrollProgress = Math.abs(rect.top) / (containerHeight - window.innerHeight);
				
				// Get all card elements (excluding the spacer)
				const cards = scrollContainer.querySelectorAll('.flex-none:not(:last-child)');
				const firstCard = cards[0] as HTMLElement;
				const lastCard = cards[cards.length - 1] as HTMLElement;
				
				if (firstCard && lastCard) {
					// The first card's offsetLeft is where it starts (should be 0 since padding is on container)
					// The last card should scroll to align its left edge with where the first card started
					// Max scroll = distance from first card to last card
					const maxScroll = lastCard.offsetLeft - firstCard.offsetLeft;
					
					// Apply horizontal scroll based on vertical scroll progress
					const targetScroll = scrollProgress * maxScroll;
					scrollContainer.scrollLeft = targetScroll;
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div 
			ref={containerRef}
			style={{
				// Height determines how long the scroll-jacking lasts
				// 4 cards = 400vh to give smooth scrolling through each card
				height: '400vh',
				position: 'relative'
			}}
		>
			<section 
				className="sticky top-0 w-full h-screen bg-white flex flex-col justify-center"
			>
				{/* Header - constrained width */}
				<div className="max-w-400 mx-auto w-full">
					<h2 className="section-title mb-6">
						Everything you <br />
						need, <span className="section-subtitle">all in one place.</span>
					</h2>
				</div>

				{/* Carousel - left-aligned with heading, extends to right edge */}
				<div className="w-full overflow-hidden">
					<div
						ref={scrollContainerRef}
						className="flex gap-6 overflow-x-hidden scrollbar-hide"
						style={{
							paddingLeft: "max(0px, calc((100% - 1600px) / 2))",
						}}
					>
						<div className="flex-none">
							<FeatureTagCard
								variant="dark"
								title="Everything you need, all in one place."
								subtitle="Centralise"
								features={features}
							/>
						</div>

						<div className="flex-none">
							<TrackingCard />
						</div>

						<div className="flex-none">
							<DashboardPreviewCard variant="light" />
						</div>

						<div className="flex-none">
							<DashboardPreviewCard variant="dark" />
						</div>

						{/* Spacer to allow last element to scroll to starting position */}
						<div
							className="flex-none"
							style={{
								width: "calc(100vw - min(100vw, 1600px) / 2)",
							}}
						/>
					</div>
				</div>

				<style>{`
					.scrollbar-hide::-webkit-scrollbar {
						display: none;
					}
					.scrollbar-hide {
						-ms-overflow-style: none;
						scrollbar-width: none;
					}
				`}</style>
			</section>
		</div>
	);
};

export default FeaturesCarousel;
