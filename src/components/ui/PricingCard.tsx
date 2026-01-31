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

/**
 * Reusable pricing card component
 * Used in: Pricing section
 * React best practice: rerender-simple-expression-in-memo - Don't memo simple feature lists
 */
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
				className={`rounded-3xl p-5 w-100 ${className}`}
				style={{
					background: `url(${pricingBlueCardBackground})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					boxShadow: "0px 60px 60px rgba(0, 0, 0, 0.3)",
				}}
			>
				{/* Inner Card */}
				<div className="relative bg-black rounded-2xl p-4 flex flex-col h-full overflow-hidden">
					{/* Blue Flame Background */}
					<img
						src={pricingBlueFlame}
						alt=""
						className="absolute bottom-0 left-0 w-full object-cover pointer-events-none opacity-70"
					/>

					<div className="relative z-10 mb-8">
						<p className="text-gray-400 text-sm mb-4">{title}</p>
						<p className="text-5xl font-light text-white mb-6">{price}</p>
						<p className="text-gray-300 leading-relaxed">{description}</p>
					</div>

					{/* Features */}
					<div className="flex-1 space-y-3 mb-20">
						{features.map((feature, index) => (
							<div key={index} className="flex items-center gap-2">
								<Check className="w-4 h-4 text-gray-400" />
								<span className="text-gray-400 font-light">{feature}</span>
							</div>
						))}
					</div>

					{/* Subscribe Button */}
					<button
						type="button"
						className="relative z-10 w-full bg-black text-white py-5 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-all group"
					>
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						<span className="font-medium">{buttonText}</span>
					</button>
				</div>
			</div>
		);
	}

	// Basic and Enterprise Plans
	return (
		<div className={`border border-gray-100 rounded-3xl p-5 w-100 ${className}`}>
			{/* Inner Card */}
			<div className="bg-gray-50 rounded-2xl p-4 flex flex-col h-full">
				<div className="mb-8">
					<p className="text-gray-400 text-sm mb-4">{title}</p>
					<p className="text-5xl font-light mb-6">{price}</p>
					<p className="text-gray-600 leading-relaxed">{description}</p>
				</div>

				{/* Features */}
				<div className="flex-1 space-y-3 mb-8">
					{features.map((feature, index) => (
						<div key={index} className="flex items-center gap-2">
							<Check className="w-4 h-4 text-gray-400 font-light" />
							<span className="text-gray-400 font-light">{feature}</span>
						</div>
					))}
				</div>

				{/* Subscribe Button */}
				<button
					type="button"
					className="w-full bg-white border border-gray-100 text-black py-3 pl-5 pr-3 rounded-md flex items-center justify-between hover:bg-gray-100 transition-all group"
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
