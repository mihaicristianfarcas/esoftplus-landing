import { ArrowRight, Check } from "lucide-react";
import pricingBlueFlame from "../../assets/pricing-blue-flame.png";
import pricingBlueCardBackground from "../../assets/pricing-blue-card-background.png";

interface PricingCardProps {
	title: string;
	price: string;
	description: string;
	features: string[];
	buttonText?: string;
	isPopular?: boolean;
	className?: string;
}

const PricingCard = ({
	title,
	price,
	description,
	features,
	buttonText = "Subscribe",
	isPopular = false,
	className = "",
}: PricingCardProps) => {
	if (isPopular) {
		// Pro Plan - with blue background image and flame
		return (
			<div
				className={`rounded-3xl p-4 lg:p-5 w-full ${className}`}
				style={{
					background: `url(${pricingBlueCardBackground})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				{/* Inner Card */}
				<div
					className="relative bg-black rounded-2xl p-6 flex flex-col h-full overflow-hidden"
					style={{
						boxShadow: "0px 60px 60px rgba(0, 0, 0, 0.3)",
					}}
				>
					<img
						src={pricingBlueFlame}
						alt=""
						className="absolute top-3 right-4 w-20 h-20 pointer-events-none z-0"
					/>
					<div className="mb-8 relative z-10">
						<p className="text-gray-400 text-sm mb-4">{title}</p>
						<p className="text-white text-4xl lg:text-5xl font-light mb-6">
							{price}
						</p>
						<p className="text-gray-400 text-sm lg:text-base leading-relaxed">
							{description}
						</p>
					</div>

					{/* Features */}
					<div className="flex-1 space-y-3 mb-12 lg:mb-20">
						{features.map((feature) => (
							<div key={feature} className="flex items-center gap-2">
								<Check className="w-4 h-4 text-gray-400" />
								<span className="text-gray-400 text-sm lg:text-base font-light">
									{feature}
								</span>
							</div>
						))}
					</div>

					{/* Subscribe Button */}
					<button
						type="button"
						className="relative z-10 w-full bg-white text-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
						aria-label={`Subscribe to ${title}`}
					>
						<span className="font-medium">{buttonText}</span>
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		);
	}

	// Basic and Enterprise Plans
	return (
		<div
			className={`border border-gray-100 rounded-3xl p-4 lg:p-5 w-full ${className}`}
		>
			{/* Inner Card */}
			<div className="bg-gray-50 rounded-2xl p-6 flex flex-col h-full">
				<div className="mb-8">
					<p className="text-gray-400 text-sm mb-4">{title}</p>
					<p className="text-4xl lg:text-5xl font-light mb-6">{price}</p>
					<p className="text-gray-600 text-sm lg:text-base leading-relaxed">
						{description}
					</p>
				</div>

				{/* Features */}
				<div className="flex-1 space-y-3 mb-8">
					{features.map((feature) => (
						<div key={feature} className="flex items-center gap-2">
							<Check className="w-4 h-4 text-gray-400 font-light" />
							<span className="text-gray-400 text-sm lg:text-base font-light">
								{feature}
							</span>
						</div>
					))}
				</div>

				{/* Subscribe Button */}
				<button
					type="button"
					className="w-full bg-white border border-gray-100 text-black py-3 pl-5 pr-3 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
					aria-label={`Subscribe to ${title}`}
				>
					<span className="font-medium">{buttonText}</span>
					<div className="icon-circle-md">
						<ArrowRight className="w-4 h-4 text-white" />
					</div>
				</button>
			</div>
		</div>
	);
};

export default PricingCard;
