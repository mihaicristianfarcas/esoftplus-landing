import TrackNodes from "./TrackNodes";
import {
	getDottedBackground,
	getRadialGradientOverlay,
} from "../../lib/backgroundPatterns";

const TrackingCard = () => {
	return (
		<div className="feature-card w-full" style={getDottedBackground()}>
			{/* Radial fade: dots visible in center, fade to solid gray at edges */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={getRadialGradientOverlay()}
			/>

			<div className="h-full flex flex-col justify-between relative z-10 min-h-0">
				<p className="text-gray-400 text-lg mb-4">Centralise</p>

				<h2 className="text-black font-semibold leading-tight text-xl lg:text-2xl mb-8">
					Track everything with ease.
				</h2>

				<div className="relative flex-1 min-h-0 overflow-hidden">
					<TrackNodes />
				</div>

				<p className="text-gray-400 text-md lg:text-xl leading-relaxed max-w-2xl">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max.
				</p>
			</div>
		</div>
	);
};

export default TrackingCard;
