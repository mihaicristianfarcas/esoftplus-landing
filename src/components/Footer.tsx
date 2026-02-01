import { ArrowRight } from "lucide-react";
import SendIcon from "../assets/send-paper-plane.svg";

const Footer = () => {
	return (
		<footer className="w-full px-4 pb-4 mt-40">
			<div className="relative bg-black h-[50vh] rounded-3xl overflow-hidden">
				{/* Main content area */}
				<div className="mx-auto w-full p-10">
					<div className="flex flex-row items-start justify-between">
						{/* Left side - Heading + Email */}
						<div className="flex flex-col w-[50%]">
							<div className="flex flex-col gap-6">
								<h2 className="text-6xl md:text-7xl font-light leading-tight tracking-tighter text-white whitespace-nowrap">
									Mobilize Your ERP
								</h2>
								<p className="text-gray-400 text-md font-light">
									Unlock instant analytics and reporting for your WMEnterprise
									data.
									<br />
									No setup headaches, just powerful insights, ready to go
								</p>
							</div>

							<div className="flex flex-col gap-6 mt-20">
								{/* Try for Free Button */}
								<button
									type="button"
									className="w-60 whitespace-nowrap bg-white text-black py-3 pl-6 pr-4 rounded-full flex items-center justify-between hover:bg-gray-100 transition-all group no-shrink"
								>
									<span className="font-medium">Try For Free</span>
									<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
										<ArrowRight className="w-4 h-4 text-white" />
									</div>
								</button>
								{/* Email Option */}
								<div className="flex items-center justify-between w-100 text-white pr-4">
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
									<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center ml-auto shrink-0">
										<ArrowRight className="w-4 h-4 text-black" />
									</div>
								</div>
							</div>
						</div>

						{/* Right side - Navigation links */}
						<div className="flex flex-row gap-24">
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 text-md font-light">Legal</span>
								<a
									href="#home"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									Terms & Conditions
								</a>
								<a
									href="#contact"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									Policy
								</a>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 text-md font-light">
									Navigation
								</span>
								<a
									href="#home"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									Home
								</a>
								<a
									href="#contact"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									Contact Us
								</a>
								<a
									href="#pricing"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									Pricing
								</a>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 text-md font-light">Social</span>
								<a
									href="#"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									LinkedIn
								</a>
								<a
									href="#"
									className="text-white font-light hover:text-gray-300 transition-colors"
								>
									Twitter
								</a>
							</div>
						</div>
					</div>

					{/* Horizontal divider */}
					<div className="mt-8 border-t border-gray-600" />
				</div>

				{/* Large Esoftplus text - absolutely positioned, overflowing bottom */}
				<div className="absolute bottom-0 left-0 right-0 translate-y-[30%] pointer-events-none">
					<svg
						viewBox="0 0 900 180"
						xmlns="http://www.w3.org/2000/svg"
						className="w-full h-auto"
						aria-hidden="true"
					>
						<defs>
							<linearGradient
								id="footer-text-gradient"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop offset="0%" stopColor="white" />
								<stop offset="85%" stopColor="#000000" />
							</linearGradient>
						</defs>
						<text
							x="50%"
							y="50%"
							dominantBaseline="central"
							textAnchor="middle"
							fill="url(#footer-text-gradient)"
							style={{
								fontSize: "205px",
								fontWeight: 500,
								letterSpacing: "-0.03em",
								fontFamily: "inherit",
							}}
						>
							Esoftplus
							<tspan
								style={{ fontSize: "60px", fontWeight: 300 }}
								dy="-40"
								dx="-10"
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
