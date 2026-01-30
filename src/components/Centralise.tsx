import { FileText, Package, Warehouse } from "lucide-react";

const TrackFeature = () => {
	const nodes = [
		{
			icon: Package,
			label: "Total Stock",
			value: "32",
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
		{
			icon: FileText,
			label: "Central HUB",
			value: "32",
			color: "text-red-500",
			bgColor: "bg-red-50",
		},
		{
			icon: Warehouse,
			label: "cargo warehouse",
			value: "32",
			color: "text-teal-600",
			bgColor: "bg-teal-50",
		},
	];

	return (
		<div className="bg-gray-100 rounded-3xl p-10 h-full">
			<div className="h-full flex flex-col justify-between">
				<p className="text-gray-400 text-sm mb-4">Centralise</p>

				<h2 className="text-black font-semibold leading-tight text-2xl mb-8">
					Track everything with ease.
				</h2>

				<div className="relative mb-12 flex-1">
					<svg
						className="absolute inset-0 w-full h-full pointer-events-none"
						style={{ zIndex: 0 }}
					>
						<title>Connecting lines</title>
						<path
							d="M 180 80 L 220 80 L 220 80 L 260 80"
							stroke="#D1D5DB"
							strokeWidth="2"
							strokeDasharray="4 4"
							fill="none"
						/>
						<path
							d="M 340 120 L 340 160 L 180 160 L 180 200"
							stroke="#D1D5DB"
							strokeWidth="2"
							strokeDasharray="4 4"
							fill="none"
						/>
					</svg>

					<div className="relative grid gap-6">
						<div className="grid grid-cols-2 gap-6">
							{nodes.slice(0, 2).map((node) => {
								const IconComponent = node.icon;
								return (
									<div
										key={node.label}
										className="bg-white rounded-2xl p-6 shadow-sm"
									>
										<div className="flex items-center gap-3 mb-3">
											<div className={`${node.bgColor} rounded-lg p-2`}>
												<IconComponent className={`w-5 h-5 ${node.color}`} />
											</div>
											<span className="text-black font-medium">
												{node.label}
											</span>
										</div>
										<p className="text-gray-600 text-2xl font-light">
											{node.value}
										</p>
									</div>
								);
							})}
						</div>

						<div className="grid grid-cols-2 gap-6">
							{(() => {
								const node = nodes[2];
								const IconComponent = node.icon;
								return (
									<div className="bg-white rounded-2xl p-6 shadow-sm">
										<div className="flex items-center gap-3 mb-3">
											<div className={`${node.bgColor} rounded-lg p-2`}>
												<IconComponent className={`w-5 h-5 ${node.color}`} />
											</div>
											<span className="text-black font-medium">
												{node.label}
											</span>
										</div>
										<p className="text-gray-600 text-2xl font-light">
											{node.value}
										</p>
									</div>
								);
							})()}
						</div>
					</div>
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
