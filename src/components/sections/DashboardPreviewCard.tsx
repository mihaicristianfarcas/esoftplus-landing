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
				className={`feature-card w-full ${className}`}
				style={getDottedBackground()}
			>
				{/* Radial fade: dots visible in center, fade to solid gray at edges */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={getRadialGradientOverlay()}
				/>

				<div className="h-full flex flex-col justify-between relative z-10 min-h-0">
					<p className="text-gray-400 text-lg mb-4">Customise</p>

					<h2 className="text-black font-semibold leading-tight text-xl lg:text-2xl mb-6 lg:mb-8 max-w-2xl">
						Custom Dashboards, tailored for your requirements.
					</h2>

					<div className="relative flex-1 flex flex-col mb-6 lg:mb-8 min-h-0">
						<button
							type="button"
							className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors z-10"
							aria-label="Maximize"
						>
							<Maximize2 className="w-5 h-5" />
						</button>

						<div className="mb-4">
							<div className="flex items-baseline gap-1 mb-2">
								<span className="font-semibold text-black text-3xl lg:text-4xl">
									$42,212
								</span>
								<span className="font-light text-gray-400 text-xl lg:text-2xl">
									.14
								</span>
							</div>
							<div className="flex items-center gap-2 text-xs lg:text-sm">
								<span className="text-gray-400">+$12.5</span>
								<div className="flex items-center gap-1 text-green-600">
									<TrendingUp className="w-3 h-3" />
									<span className="font-medium">6.91%</span>
								</div>
								<span className="text-gray-400">Today</span>
							</div>
						</div>

						<div className="flex-1 mt-auto -mx-6 lg:-mx-10 w-[calc(100%+3rem)] lg:w-[calc(100%+5rem)]">
							<img
								src={graphSvgLight}
								alt="Performance graph"
								className="w-full h-full object-fill"
							/>
						</div>
					</div>

					<p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-xl">
						Some text here explaining what this feature does. Preferably 2-3
						rows max. This is how it would look with 3 rows for now.
					</p>
				</div>
			</div>
		);
	}

	// Dark variant with simple graph
	return (
		<div className={`feature-card bg-[#1A1A1A] ${className}`}>
			<div className="h-full flex flex-col justify-between">
				<div>
					<p className="text-gray-500 text-lg mb-4">Customise</p>

					<h2 className="text-white font-semibold leading-tight max-w-2xl text-xl lg:text-2xl mb-6 lg:mb-8">
						Custom Dashboards, tailored for your requirements.
					</h2>
				</div>

				<div className="w-full relative flex-1 flex items-end">
					<img
						src={graphSvgDark}
						alt="Performance graph"
						className="w-full h-auto object-contain"
					/>
				</div>

				<p className="text-gray-500 text-lg lg:text-xl leading-relaxed max-w-xl mt-6 lg:mt-8">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max. This is how it would look with 3 rows for now.
				</p>
			</div>
		</div>
	);
};

export default DashboardPreviewCard;
