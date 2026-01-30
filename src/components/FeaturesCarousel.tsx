import Centralise from "./CentraliseDark";
import CustomDashboard from "./CustomDashboard";
import CustomDashboardDark from "./CustomDashboardDark";
import TrackFeature from "./Centralise";

const FeaturesCarousel = () => {
	return (
		<section className="relative w-full min-h-screen bg-white flex flex-col justify-center">
			{/* Header - constrained width */}
			<div className="max-w-400 mx-auto w-full">
				<h2 className="text-6xl md:text-7xl font-light leading-tight tracking-tighter mb-6">
					Everything you <br />
					need, <span className="text-gray-300">all in one place.</span>
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
						<Centralise />
					</div>

					<div className="flex-none snap-start">
						<TrackFeature />
					</div>

					<div className="flex-none snap-start">
						<CustomDashboard />
					</div>

					<div className="flex-none snap-start">
						<CustomDashboardDark />
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
