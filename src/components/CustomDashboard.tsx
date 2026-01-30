import { Maximize2, TrendingUp } from "lucide-react";
import graphSvg from "../assets/green-blue-graphs.png";

const CustomDashboard = () => {
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
				<p className="text-gray-400 text-sm mb-4">Customise</p>

				<h2 className="text-black font-semibold leading-tight text-2xl mb-8 max-w-2xl">
					Custom Dashboards, tailored for your requirements.
				</h2>

				<div className="relative flex-1 flex flex-col mb-8">
					<button
						type="button"
						className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors z-10"
						aria-label="Maximize"
					>
						<Maximize2 className="w-5 h-5" />
					</button>

					<div className="mb-4">
						<div className="flex items-baseline gap-1 mb-2">
							<span className="font-semibold text-black text-4xl">$42,212</span>
							<span className="font-light text-gray-400 text-2xl">.14</span>
						</div>
						<div className="flex items-center gap-2 text-sm">
							<span className="text-gray-400">+$12.5</span>
							<div className="flex items-center gap-1 text-green-600">
								<TrendingUp className="w-3 h-3" />
								<span className="font-medium">6.91%</span>
							</div>
							<span className="text-gray-400">Today</span>
						</div>
					</div>

					<div
						className="w-full flex-1 mt-auto -mx-10 px-0"
						style={{ width: "calc(100% + 5rem)" }}
					>
						<img
							src={graphSvg}
							alt="Performance graph"
							className="w-full h-full object-fill"
						/>
					</div>
				</div>

				<p className="text-gray-400 text-xl leading-relaxed max-w-xl">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max. This is how it would look with 3 rows for now.
				</p>
			</div>
		</div>
	);
};

export default CustomDashboard;
