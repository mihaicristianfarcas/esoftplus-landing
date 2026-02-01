import { ArrowUpRight } from "lucide-react";
import dashboardImage from "../assets/hero-dashboard-preview.png";
import backgroundPattern from "../assets/gradient-hero.png";

const Hero = () => {
	return (
		<section className="relative min-h-[90svh] lg:h-screen w-full flex items-center justify-center py-20 lg:py-0 overflow-hidden">
			<div
				className="absolute inset-0 w-full h-full bg-center bg-no-repeat pointer-events-none"
				style={{
					backgroundImage: `url(${backgroundPattern})`,
					backgroundSize: "cover",
					filter: "saturate(1.5) contrast(1.2) brightness(0.9)",
				}}
			/>
			{/* Hero Content */}
			<div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mt-20 text-center">
				{/* Top Text */}
				<p className="text-gray-400 mb-4 text-xl animate-fade-in">
					Unlock full potential.
				</p>

				{/* Main Heading */}
				<h1 className="hero-title mb-16 lg:mb-28 tracking-tighter">
					Mobilize Your ERP
				</h1>

				{/* CTA Buttons */}
				<div className="grid grid-cols-1 sm:grid-flow-col sm:auto-cols-fr gap-4 lg:gap-6 mb-16 lg:mb-10">
					<button
						type="button"
						className="flex items-center justify-center bg-black text-white gap-6 pl-1.5 pr-8 py-1.5 rounded-full hover:bg-gray-800 transition-all text-lg lg:text-xl font-light tracking-tight"
					>
						<div
							className="relative border border-gray-600 rounded-full px-5 py-3 overflow-hidden"
							style={{
								backgroundImage:
									"repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,255,255, 0.3) 3px, rgba(255,255,255,0.1) 4px)",
							}}
						>
							<ArrowUpRight className="relative z-10 w-5 h-5" />
						</div>
						Try Demo
					</button>
					<button
						type="button"
						className="flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-100 transition-all text-lg lg:text-xl font-light tracking-tight border border-gray-300"
					>
						Contact Us
					</button>
				</div>

				{/* Dashboard Image Container - Oval with overflow */}
				<div className="relative w-full mx-auto">
					{/* Oval Background Container */}
					<div
						className="relative w-[90%] mx-auto bg-[#F0F0F0] overflow-hidden rounded-[80px] lg:rounded-[240px]"
						style={{ aspectRatio: "23 / 11" }}
					>
						<div
							className="absolute w-[75%] left-1/2 transform -translate-x-1/2"
							style={{
								filter: "drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.3))",
							}}
						>
							<img
								src={dashboardImage}
								alt="Dashboard Preview"
								className="w-full h-auto rounded-lg lg:rounded-xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
