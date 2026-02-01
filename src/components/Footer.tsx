import { ArrowRight } from "lucide-react";
import SendIcon from "../assets/send-paper-plane.svg";

const Footer = () => {
	return (
		<footer className="w-full px-2 pb-2 mt-20 md:px-4 md:pb-4 md:mt-40">
			<div className="bg-black rounded-3xl overflow-hidden flex flex-col justify-between">
				{/* Main content area */}
				<div className="w-full p-6 md:p-10">
					<div className="flex flex-col lg:flex-row items-start justify-between">
						{/* Left side - Heading + Email */}
						<div className="flex flex-col w-full lg:w-[50%]">
							<div className="flex flex-col gap-4 md:gap-6">
								<h2 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tighter text-white whitespace-nowrap">
									Mobilize Your ERP
								</h2>
								<p className="text-gray-400 text-lg md:text-xl font-light">
									Unlock instant analytics and reporting for your WMEnterprise
									data.
									<br className="hidden md:block" />
									No setup headaches, just powerful insights, ready to go.
								</p>
							</div>

							<div className="flex flex-col gap-6 mt-10 md:mt-20">
								{/* Try for Free Button */}
								<button
									type="button"
									className="w-full md:w-60 whitespace-nowrap bg-white text-black py-3 pl-6 pr-4 rounded-full flex items-center justify-between hover:bg-gray-100 transition-all group no-shrink"
								>
									<span className="font-medium text-md md:text-lg">
										Try For Free
									</span>
									<div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
										<ArrowRight className="w-6 h-6 text-white" />
									</div>
								</button>
								{/* Email Option */}
								<div className="flex items-center justify-between w-full md:w-auto md:max-w-md text-white md:pr-4">
									<div className="flex items-center gap-3 text-white">
										<img src={SendIcon} alt="" className="w-8 h-8 shrink-0" />
										<div>
											<p className="text-lg mb-0.5">Send us a message.</p>
											<a
												href="mailto:support@esoftplus.com"
												className="text-gray-400 text-lg hover:text-gray-700 transition-colors"
											>
												support@esoftplus.com
											</a>
										</div>
									</div>
									<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center ml-auto shrink-0">
										<ArrowRight className="w-6 h-6 text-black" />
									</div>
								</div>
							</div>
						</div>

						{/* Right side - Navigation links */}
						<div className="flex flex-wrap items-start justify-between flex-row  gap-2 sm:gap-10 md:gap-30 lg:gap-40 mt-10 lg:mt-0 w-full lg:w-auto">
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 text-xl font-light">Legal</span>
								<a
									href="#home"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									Terms & Conditions
								</a>
								<a
									href="#contact"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									Policy
								</a>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 text-xl font-light">Menu</span>
								<a
									href="#home"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									Home
								</a>
								<a
									href="#contact"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									Pricing
								</a>
								<a
									href="#pricing"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									FAQ
								</a>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 text-xl font-light">
									Actions
								</span>
								<a
									href="#"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									Contact Us
								</a>
								<a
									href="#"
									className="text-white font-light text-xl hover:text-gray-300 transition-colors"
								>
									Try Demo
								</a>
							</div>
						</div>
					</div>

					{/* Horizontal divider */}
					<div className="mt-8 border-t border-gray-600" />
				</div>

				{/* Large Esoftplus text - SVG based */}
				<div className="w-full px-6 md:px-10 -mt-4 md:-mt-14">
					<svg
						viewBox="10 0 930 155"
						className="w-full h-auto"
						preserveAspectRatio="xMidYMax meet"
					>
						<defs>
							<linearGradient id="footer-gradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="white" />
								<stop offset="75%" stopColor="black" />
							</linearGradient>
						</defs>
						<text
							x="50%"
							y="195"
							textAnchor="middle"
							className="font-bold tracking-tighter"
							fill="url(#footer-gradient)"
							fontSize="220"
							fontFamily="Inter, sans-serif"
							letterSpacing="-0.06em"
						>
							Esoftplus
							<tspan
								fontSize="40"
								dy="-100"
								dx="10"
								fontWeight="300"
								letterSpacing="0"
							>
								®
							</tspan>
						</text>
					</svg>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
