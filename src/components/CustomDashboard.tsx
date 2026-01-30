import { Maximize2, TrendingUp } from "lucide-react";
import graphSvg from "../assets/green-blue-graphs.svg";

const CustomDashboard = () => {
	return (
		<div className="bg-gray-100 rounded-3xl p-10 h-full">
			<div className="h-full flex flex-col justify-between">
				<p className="text-gray-400 text-sm mb-4">Customise</p>

				<h2 className="text-black font-semibold leading-tight text-2xl mb-8 max-w-2xl">
					Custom Dashboards, tailored for your requirements.
				</h2>

				<div className="bg-white rounded-3xl p-8 mb-8 relative flex-1">
					<button
						type="button"
						className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Maximize"
					>
						<Maximize2 className="w-5 h-5" />
					</button>

					<div className="mb-8">
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

					<div className="w-full h-40 relative">
						<img
							src={graphSvg}
							alt="Performance graph"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				<p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max. This is how it would look with 3 rows for now.
				</p>
			</div>
		</div>
	);
};

export default CustomDashboard;
