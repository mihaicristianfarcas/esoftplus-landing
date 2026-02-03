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
			className={`feature-card-compact feature-card-landscape-tags w-full ${isDark ? "bg-[#1A1A1A]" : "bg-white"} ${className}`}
		>
			<div className="h-full flex flex-col justify-between min-h-0">
				{/* Header section - horizontal layout in landscape */}
				<div className="landscape-header flex flex-col justify-start gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 flex-1 min-h-0">
					{/* Title section - left side in landscape */}
					<div className="landscape-title-section">
						<p
							className={`text-xs xs:text-sm sm:text-base md:text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
						>
							{subtitle}
						</p>

						<h2
							className={`font-semibold leading-tight text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 ${isDark ? "text-white" : "text-black"}`}
						>
							{title}
						</h2>
					</div>

					{/* Tags section - right side in landscape */}
					<div className="landscape-tags-section flex flex-col gap-1 xs:gap-1.5 sm:gap-2 mb-2 xs:mb-3 sm:mb-4 overflow-y-auto scrollbar-hide min-h-0 max-h-[30vh] xs:max-h-[35vh] sm:max-h-none">
						{features.map((row) => {
							const rowKey = row.join("-");
							return (
								<div
									key={rowKey}
									className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3"
								>
									{row.map((feature) => (
										<span
											key={feature}
											className={
												feature === "& More"
													? `feature-badge-muted text-[9px] xs:text-[10px] sm:text-xs lg:text-sm py-1 px-2 xs:py-1.5 xs:px-2.5 sm:py-2 sm:px-4`
													: `feature-badge text-[9px] xs:text-[10px] sm:text-xs lg:text-sm py-1 px-2 xs:py-1.5 xs:px-2.5 sm:py-2 sm:px-4`
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
				<button
					type="button"
					className="btn-full-width mt-1 xs:mt-1.5 sm:mt-2 shrink-0 py-2 xs:py-2.5 sm:py-3"
				>
					<span className="text-[10px] xs:text-xs sm:text-sm lg:text-lg pl-1.5 sm:pl-2 font-medium">
						{buttonText}
					</span>
					<div className="icon-circle w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8">
						<ArrowRight
							className={`w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${isDark ? "text-white" : "text-black"}`}
						/>
					</div>
				</button>
			</div>
		</div>
	);
};

export default FeatureTagCard;
