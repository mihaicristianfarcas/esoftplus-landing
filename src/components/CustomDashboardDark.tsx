import graphSvg from "../assets/red-blue-green-graphs.svg";

const CustomDashboardDark = () => {
	return (
		<div className="bg-[#1A1A1A] rounded-3xl p-10 h-full">
			<div className="h-full flex flex-col justify-between">
				<div>
					<p className="text-gray-500 text-sm mb-4">Customise</p>

					<h2 className="text-white font-semibold leading-tight max-w-2xl text-2xl mb-8">
						Custom Dashboards, tailored for your requirements.
					</h2>
				</div>

				<div className="w-full relative flex-1 flex items-end">
					<img
						src={graphSvg}
						alt="Performance graph"
						className="w-full h-auto object-contain"
					/>
				</div>

				<p className="text-gray-500 text-sm leading-relaxed max-w-2xl mt-8">
					Some text here explaining what this feature does. Preferably 2-3 rows
					max. This is how it would look with 3 rows for now.
				</p>
			</div>
		</div>
	);
};

export default CustomDashboardDark;
