import dashboardImage from "../assets/WhatsApp Image 2025-09-18 at 17.04.57.png";

const Hero = () => {
	return (
		<section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
			{/* Hero Content */}
			<div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1400px] px-8">
				{/* Top Text */}
				<p className="text-gray-400 text-md mb-4">Unlock full potential.</p>

				{/* Main Heading */}
				<h1 className="text-7xl font-black font-semibold text-black mb-24 tracking-tight">
					Mobilize Your ERP
				</h1>

				{/* CTA Buttons */}
				<div className="flex items-center gap-6 mb-8 ">
					<button className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium">
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="transform -rotate-45"
						>
							<path
								d="M4 10h12M10 4l6 6-6 6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Try Demo
					</button>
					<button className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-medium border border-gray-300">
						Contact Us
					</button>
				</div>

				{/* Dashboard Image Container - Oval with overflow */}
				<div className="relative w-full">
					{/* Oval Background Container */}
					<div
						className="relative w-full h-full bg-[#F0F0F0] overflow-hidden"
						style={{
							borderRadius: "50%",
							paddingBottom: "40%", // Creates the oval shape (aspect ratio)
						}}
					>
						{/* Dashboard Image - overflowing 30% to the top */}
						<div
							className="absolute w-[85%] left-1/2 transform -translate-x-1/2"
							style={{
								top: "-15%", // 30% overflow means starting at -15% from center
								filter: "drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.3))",
							}}
						>
							<img
								src={dashboardImage}
								alt="Dashboard Preview"
								className="w-full h-auto rounded-xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
