import trackNodesPng from "../assets/track-nodes.svg";

const TrackFeature = () => {
	return (
		<div
			className="rounded-3xl p-10 h-full relative overflow-hidden"
			style={{
				backgroundColor: "#f3f4f6",
				backgroundImage:
					"radial-gradient(circle, #d1d5db 1px, transparent 1px)",
				backgroundSize: "20px 20px",
			}}
		>
			{/* Radial fade: dots visible in center, fade to solid gray at edges */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(ellipse at 50% 50%, transparent 40%, #f3f4f6 85%)",
				}}
			/>

			<div className="h-full flex flex-col justify-between relative z-1">
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

export default TrackFeature;
