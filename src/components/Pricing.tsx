import { Check, ArrowRight } from "lucide-react";
import pricingBlueFlame from "../assets/pricing-blue-flame.png";
import pricingBlueCardBackground from "../assets/pricing-blue-card-background.png";

const Pricing = () => {
	const basicFeatures = [
		"Complete Analytics",
		"Daily summary",
		"Inventory Control",
		"PnL Overview",
	];

	const proFeatures = [
		"Complete Analytics",
		"Daily summary",
		"Inventory Control",
		"PnL Overview",
	];

	const enterpriseFeatures = [
		"Complete Analytics",
		"Daily summary",
		"Inventory Control",
		"PnL Overview",
	];

	return (
		<section className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden py-20">
			<div className="max-w-7xl mx-auto w-full">
				{/* Title */}
				<h2 className="text-6xl md:text-7xl font-light leading-tight tracking-tighter mb-16">
					Subscription
				</h2>

				{/* Pricing Cards */}
				<div className="flex items-stretch justify-center gap-8 mb-8">
					{/* Basic Plan - Outer Card */}
					<div className="border border-gray-100 rounded-3xl p-5 w-100">
						{/* Inner Card */}
						<div className="bg-gray-50 rounded-2xl p-4 flex flex-col h-full">
							<div className="mb-8">
								<p className="text-gray-400 text-sm mb-4">Basic Plan</p>
								<p className="text-5xl font-light mb-6">$55</p>
								<p className="text-gray-600 leading-relaxed">
									Perfect for basic usage, seeing your profits and checking
									inventory.
								</p>
							</div>

							{/* Features */}
							<div className="flex-1 space-y-3 mb-8">
								{basicFeatures.map((feature, index) => (
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
								<span className="font-medium">Subscribe</span>
								<div className="w-9 h-9 bg-black rounded-full flex items-center justify-center ">
									<ArrowRight className="w-4 h-4 text-white" />
								</div>
							</button>
						</div>
					</div>

					{/* Pro Plan - Outer Card (blue background image) */}
					<div
						className="rounded-3xl p-5 w-100"
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
								<p className="text-gray-400 text-sm mb-4">Pro Plan</p>
								<p className="text-5xl font-light text-white mb-6">$150</p>
								<p className="text-gray-300 leading-relaxed">
									Perfect for basic usage, seeing your profits and checking
									inventory.
								</p>
							</div>

							{/* Features */}
							<div className="flex-1 space-y-3 mb-20">
								{proFeatures.map((feature, index) => (
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
								<span className="font-medium">Subscribe</span>
							</button>
						</div>
					</div>

					{/* Enterprise Plan - Outer Card */}
					<div className="border border-gray-100 rounded-3xl p-5 w-100">
						{/* Inner Card */}
						<div className="bg-gray-50 rounded-2xl p-4 flex flex-col h-full">
							<div className="mb-8">
								<p className="text-gray-400 text-sm mb-4">Enterprise Plan</p>
								<p className="text-5xl font-light mb-6">$400</p>
								<p className="text-gray-600 leading-relaxed">
									Perfect for basic usage, seeing your profits and checking
									inventory.
								</p>
							</div>

							{/* Features */}
							<div className="flex-1 space-y-3 mb-20">
								{enterpriseFeatures.map((feature, index) => (
									<div key={index} className="flex items-center gap-2">
										<Check className="w-4 h-4 text-gray-400" />
										<span className="text-gray-400 font-light">{feature}</span>
									</div>
								))}
							</div>

							{/* Subscribe Button */}
							<button
								type="button"
								className="w-full bg-white border border-gray-100 text-black py-3 pl-5 pr-3 rounded-md flex items-center justify-between hover:bg-gray-100 transition-all group"
							>
								<span className="font-medium">Subscribe</span>
								<div className="w-9 h-9 bg-black rounded-full flex items-center justify-center ">
									<ArrowRight className="w-4 h-4 text-white" />
								</div>
							</button>
						</div>
					</div>
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
