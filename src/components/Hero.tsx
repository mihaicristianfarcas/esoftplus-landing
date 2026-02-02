import { ArrowUpRight, Hexagon } from "lucide-react";
import dashboardImage from "../assets/hero-dashboard-preview.png";
import backgroundPattern from "../assets/gradient-hero.png";

const Hero = () => {
	return (
		<section className="relative min-h-[90svh] lg:h-screen w-full flex items-center justify-center overflow-hidden">
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
						className="flex items-center justify-center bg-black text-white gap-6 pl-1.5 pr-8 py-1.5 rounded-full hover:bg-gray-800 transition-all text-lg lg:text-xl font-light tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
						aria-label="Try demo"
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
						className="flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-100 transition-all text-lg lg:text-xl font-light tracking-tight border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
						aria-label="Contact us"
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
			{/* Hero Footer */}
			<div className=" absolute inset-x-6 inset-y-6 max-w-full flex items-end justify-between gap-8">
				{/* Left Side - Used By */}
				<div className="flex flex-col items-start gap-0.5">
					<span className="text-md lg:text-lg font-light text-gray-400">
						Used By
					</span>
					<span className="text-md lg:text-lg font-light text-black">
						Untold
					</span>
				</div>

				{/* Center - Description */}
				<div className="hidden lg:block max-w-2xl text-center mx-auto">
					<div className="flex flex-col space-y-0 text-gray-400 font-light text-md lg:text-lg">
						<p>
							Unlock instant analytics and reporting for your WMEnterprise data.
						</p>
						<p>No setup headaches, just powerful insights, ready to go</p>
					</div>
				</div>

				{/* Right Side - Scroll Indicator */}
				<div className="flex flex-col items-center gap-1.5">
					<div className="w-6 lg:w-8 h-12 lg:h-16 border-2 border-black rounded-full flex items-end justify-center pb-2">
						<Hexagon className="w-3 h-3 lg:w-4 lg:h-4 fill-black text-black" />
					</div>
					<span className="text-xs lg:text-sm text-black tracking-wider font-medium">
						SCROLL
					</span>
				</div>
			</div>
		</section>
	);
};

export default Hero;
