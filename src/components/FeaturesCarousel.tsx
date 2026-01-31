import DashboardPreviewCard from "./sections/DashboardPreviewCard";
import FeatureTagCard from "./sections/FeatureTagCard";
import TrackingCard from "./sections/TrackingCard";

const FeaturesCarousel = () => {
	// Feature data for FeatureTagCard
	const features = [
		["Dashboards", "Tracking", "Bank Syncing", "Sales Count", "Dashboards"],
		["Tracking", "Bank Syncing", "Partners Tracking", "& More"],
	];

	return (
		<section className="relative w-full min-h-screen bg-white flex flex-col justify-center">
			{/* Header - constrained width */}
			<div className="max-w-400 mx-auto w-full">
				<h2 className="section-title mb-6">
					Everything you <br />
					need, <span className="section-subtitle">all in one place.</span>
				</h2>
			</div>

			{/* Carousel - left-aligned with heading, extends to right edge */}
			<div className="w-full overflow-y-hidden">
				<div
					className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
					style={{
						paddingLeft: "max(0px, calc((100% - 1600px) / 2))",
						scrollPaddingLeft: "max(0px, calc((100% - 1600px) / 2))",
					}}
				>
					<div className="flex-none snap-start">
						<FeatureTagCard
							variant="dark"
							title="Everything you need, all in one place."
							subtitle="Centralise"
							features={features}
						/>
					</div>

					<div className="flex-none snap-start">
						<TrackingCard />
					</div>

					<div className="flex-none snap-start">
						<DashboardPreviewCard variant="light" />
					</div>

					<div className="flex-none snap-start">
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
	);
};

export default FeaturesCarousel;
