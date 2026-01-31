import { ArrowRight } from "lucide-react";
import { pricingTiers } from "../data/pricing";
import PricingCard from "./ui/PricingCard";

const Pricing = () => {
	return (
		<section className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden py-20">
			<div className="max-w-7xl mx-auto w-full">
				{/* Title */}
				<h2 className="text-6xl md:text-7xl font-light leading-tight tracking-tighter mb-16">
					Subscription
				</h2>

				{/* Pricing Cards */}
				<div className="flex items-stretch justify-center gap-8 mb-8">
					{pricingTiers.map((tier) => (
						<PricingCard
							key={tier.id}
							title={tier.name}
							price={tier.price}
							description={tier.description}
							features={tier.features}
							isPopular={tier.isPopular}
						/>
					))}
				</div>

				{/* Custom Section - Outer Card */}
				<div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
					{/* Inner Card */}
					<div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-end justify-between">
						<div className="flex flex-col justify-between items-start space-y-4">
							<p className="text-gray-400 text-sm">Not enough?</p>
							<h3 className="text-4xl font-light">Custom</h3>
							<p className="text-gray-600 text-lg">
								Is there something missing? Book a call and we'll tailor the
								dashboard to your needs.
							</p>
						</div>
						<button
							type="button"
							className="bg-black text-white p-4 rounded-md flex items-center justify-between gap-48 hover:bg-gray-900 transition-all group shrink-0"
						>
							<span className="font-medium">Book a call</span>
							<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center ">
								<ArrowRight className="w-4 h-4 text-black" />
							</div>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
