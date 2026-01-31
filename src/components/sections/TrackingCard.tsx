import trackNodesPng from "../../assets/track-nodes.svg";
import {
	getDottedBackground,
	getRadialGradientOverlay,
} from "../../lib/backgroundPatterns";

/**
 * Tracking feature card with dotted background
 * Renamed from: Centralise.tsx
 * React best practice: js-cache-property-access - Use cached background patterns
 */
const TrackingCard = () => {
	return (
		<div className="feature-card" style={getDottedBackground()}>
			{/* Radial fade: dots visible in center, fade to solid gray at edges */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={getRadialGradientOverlay()}
			/>

			<div className="h-full flex flex-col justify-between relative z-10">
				<p className="text-gray-400 text-sm mb-4">Centralise</p>

				<h2 className="text-black font-semibold leading-tight text-2xl mb-8">
					Track everything with ease.
				</h2>

				<div className="relative mb-12 flex-1">
					<img
						src={trackNodesPng}
						alt="Track nodes showing Total Stock, Central HUB, and cargo warehouse"
						className="w-full h-full object-contain object-top-left"
					/>
				</div>

				<p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max.
				</p>
			</div>
		</div>
	);
};

export default TrackingCard;
