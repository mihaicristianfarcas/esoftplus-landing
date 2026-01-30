import { ArrowRight } from "lucide-react";

const Centralise = () => {
	const features = [
		["Dashboards", "Tracking", "Bank Syncing", "Sales Count", "Dashboards"],
		["Tracking", "Bank Syncing", "Partners Tracking", "& More"],
	];

	return (
		<div className="bg-[#1A1A1A] rounded-3xl p-8 h-full">
			<div className="h-full flex flex-col justify-between">
				<div className="flex flex-col justify-start gap-4">
					<p className="text-gray-400 text-sm">Centralise</p>

					<h2 className="text-white font-semibold leading-tight text-3xl mb-2">
						Everything you need, all in one place.
					</h2>

					<div className="flex flex-col gap-3 mb-3">
						{features.map((row, rowIndex) => (
							<div key={`row-${rowIndex}`} className="flex flex-wrap gap-3">
								{row.map((feature, index) => (
									<span
										key={`${rowIndex}-${index}-${feature}`}
										className={`rounded-full font-medium px-4 py-2 text-sm ${
											feature === "& More"
												? "bg-[#1A1A1A] text-gray-400 border border-gray-400"
												: "bg-white text-black"
										}`}
									>
										{feature}
									</span>
								))}
							</div>
						))}
					</div>
				</div>
				<button
					type="button"
					className="w-full bg-white text-black rounded-full pr-2 pl-5 py-2 flex items-center justify-between hover:bg-gray-100 transition-colors"
				>
					<span className="text-lg font-medium">View All Features</span>
					<div className="bg-black text-white rounded-full p-3">
						<ArrowRight className="w-5 h-5" />
					</div>
				</button>
			</div>
		</div>
	);
};

export default Centralise;
