import { ArrowRight } from "lucide-react";

interface FeatureTagCardProps {
	variant?: "dark" | "light";
	title: string;
	subtitle: string;
	features: string[][];
	buttonText?: string;
	className?: string;
}

const FeatureTagCard = ({
	variant = "dark",
	title,
	subtitle,
	features,
	buttonText = "View All Features",
	className = "",
}: FeatureTagCardProps) => {
	const isDark = variant === "dark";

	return (
		<div
			className={`feature-card-compact w-full ${isDark ? "bg-[#1A1A1A]" : "bg-white"} ${className}`}
		>
			<div className="h-full flex flex-col justify-between">
				<div className="flex flex-col justify-start gap-4">
					<p
						className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
					>
						{subtitle}
					</p>

					<h2
						className={`font-semibold leading-tight text-2xl lg:text-3xl mb-4 ${isDark ? "text-white" : "text-black"}`}
					>
						{title}
					</h2>

					<div className="flex flex-col gap-3 mb-6">
						{features.map((row) => {
							const rowKey = row.join("-");
							return (
								<div key={rowKey} className="flex flex-wrap gap-2 lg:gap-3">
									{row.map((feature) => (
										<span
											key={feature}
											className={
												feature === "& More"
													? `feature-badge-muted text-xs lg:text-sm`
													: `feature-badge text-xs lg:text-sm`
											}
										>
											{feature}
										</span>
									))}
								</div>
							);
						})}
					</div>
				</div>
				<button type="button" className="btn-full-width">
					<span className="text-base lg:text-lg font-medium">{buttonText}</span>
					<div className={isDark ? "icon-circle-white" : "icon-circle"}>
						<ArrowRight
							className={`w-4 h-4 lg:w-5 lg:h-5 ${isDark ? "text-black" : "text-white"}`}
						/>
					</div>
				</button>
			</div>
		</div>
	);
};

export default FeatureTagCard;
