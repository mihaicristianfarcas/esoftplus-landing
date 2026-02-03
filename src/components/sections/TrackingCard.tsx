import TrackNodes from "./TrackNodes";
import {
	getDottedBackground,
	getRadialGradientOverlay,
} from "../../lib/backgroundPatterns";

const TrackingCard = () => {
	return (
		<div
			className="feature-card feature-card-landscape-tracking w-full"
			style={getDottedBackground()}
		>
			{/* Radial fade: dots visible in center, fade to solid gray at edges */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={getRadialGradientOverlay()}
			/>

			{/* Content section - left side in landscape */}
			<div className="landscape-content h-full flex flex-col justify-between relative z-10 min-h-0">
				<p className="text-gray-400 text-xs xs:text-sm sm:text-base md:text-lg mb-0.5 xs:mb-1 sm:mb-2">
					Centralise
				</p>

				<h2 className="text-black font-semibold leading-tight text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1.5 xs:mb-2 sm:mb-3 md:mb-4">
					Track everything with ease.
				</h2>

				{/* TrackNodes - shown inline on portrait, hidden here on landscape */}
				<div className="relative flex-1 min-h-0 overflow-hidden mb-2 xs:mb-3 sm:mb-4 portrait-only max-h-[35vh] xs:max-h-[40vh] sm:max-h-none">
					<TrackNodes />
				</div>

				<p className="text-gray-400 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-lg xl:text-xl leading-relaxed max-w-xl">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max. This is how it would look with 3 rows for now.
				</p>
			</div>

			{/* Visual section - right side in landscape, hidden in portrait */}
			<div className="landscape-visual landscape-only relative z-10">
				<TrackNodes isLandscape />
			</div>
		</div>
	);
};

export default TrackingCard;
