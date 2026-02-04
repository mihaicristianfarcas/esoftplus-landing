import { Maximize2, TrendingUp } from "lucide-react";
import graphSvgLight from "../../assets/green-blue-graphs.png";
import graphSvgDark from "../../assets/red-blue-green-graphs.svg";
import {
	getDottedBackground,
	getRadialGradientOverlay,
} from "../../lib/backgroundPatterns";

interface DashboardPreviewCardProps {
	variant?: "light" | "dark";
	className?: string;
}

const DashboardPreviewCard = ({
	variant = "light",
	className = "",
}: DashboardPreviewCardProps) => {
	const isLight = variant === "light";

	if (isLight) {
		// Light variant with dotted background and stats
		return (
			<div
				className={`feature-card feature-card-landscape-light w-full ${className}`}
				style={getDottedBackground()}
			>
				{/* Radial fade: dots visible in center, fade to solid gray at edges */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={getRadialGradientOverlay()}
				/>

				{/* Content section - left side in landscape */}
				<div className="landscape-content h-full flex flex-col justify-between relative z-10 min-h-0">
					<p className="card-subtitle card-subtitle-light">Customise</p>

					<h2 className="feature-card-title feature-card-title-light">
						Custom Dashboards, tailored for your requirements.
					</h2>

					<div className="relative flex-1 flex flex-col mb-2 xs:mb-3 sm:mb-4 min-h-0 landscape-stats-section">
						<button
							type="button"
							className="cursor-pointer absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors z-10 landscape-hidden"
							aria-label="Maximize"
						>
							<Maximize2 className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
						</button>

						<div className="mb-1.5 xs:mb-2 sm:mb-3 md:mb-4">
							<div className="flex items-baseline gap-0.5 xs:gap-1 mb-0.5 xs:mb-1 sm:mb-2">
								<span className="font-semibold text-black text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
									$42,212
								</span>
								<span className="font-light text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
									.14
								</span>
							</div>
							<div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-sm">
								<span className="text-gray-400">+$12.5</span>
								<div className="flex items-center gap-0.5 xs:gap-1 text-green-600">
									<TrendingUp className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" />
									<span className="font-medium">6.91%</span>
								</div>
								<span className="text-gray-400">Today</span>
							</div>
						</div>

						{/* Graph - shown inline on portrait, hidden here on landscape */}
						<div className="flex-1 mt-auto -mx-3 xs:-mx-4 sm:-mx-6 lg:-mx-10 w-[calc(100%+1.5rem)] xs:w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+5rem)] min-h-0 portrait-only max-h-[30vh] xs:max-h-[35vh] sm:max-h-none">
							<img
								src={graphSvgLight}
								alt="Performance graph"
								className="w-full h-full object-fill object-bottom"
							/>
						</div>
					</div>

					<p className="card-description card-description-light">
						Some text here explaining what this feature does. Preferably 2-3
						rows max. This is how it would look with 3 rows for now.
					</p>
				</div>

				{/* Visual section - right side in landscape, hidden in portrait */}
				<div className="landscape-visual landscape-only relative z-10">
					<img
						src={graphSvgLight}
						alt="Performance graph"
						className="w-full h-full object-fill object-center"
					/>
				</div>
			</div>
		);
	}

	// Dark variant with simple graph
	return (
		<div
			className={`feature-card feature-card-landscape-dark bg-[#1A1A1A] ${className}`}
		>
			{/* Content section - left side in landscape */}
			<div className="landscape-content h-full flex flex-col justify-between">
				<div>
					<p className="card-subtitle card-subtitle-dark">Customise</p>

					<h2 className="feature-card-title feature-card-title-dark max-w-2xl">
						Custom Dashboards, tailored for your requirements.
					</h2>
				</div>

				{/* Graph - shown inline on portrait, hidden here on landscape */}
				<div className="w-full relative flex-1 flex items-end min-h-0 overflow-hidden portrait-only max-h-[35vh] xs:max-h-[40vh] sm:max-h-none">
					<img
						src={graphSvgDark}
						alt="Performance graph"
						className="w-full h-full object-fill"
					/>
				</div>

				<p className="card-description card-description-dark">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max. This is how it would look with 3 rows for now.
				</p>
			</div>

			{/* Visual section - right side in landscape, hidden in portrait */}
			<div className="landscape-visual landscape-only">
				<img
					src={graphSvgDark}
					alt="Performance graph"
					className="w-full h-full object-fill"
				/>
			</div>
		</div>
	);
};

export default DashboardPreviewCard;
