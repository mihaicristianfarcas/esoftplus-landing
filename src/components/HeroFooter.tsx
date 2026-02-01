import { Hexagon } from "lucide-react";
import { useScrollOpacity } from "../hooks/useScrollOpacity";

const HeroFooter = () => {
	const opacity = useScrollOpacity();

	return (
		<footer
			className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 lg:py-6 transition-opacity duration-300 hidden sm:block"
			style={{ opacity }}
		>
			<div className="max-w-full flex items-center justify-between gap-8">
				{/* Left Side - Used By */}
				<div className="flex flex-col items-start gap-0.5">
					<span className="text-sm font-light text-gray-400">Used By</span>
					<span className="text-sm lg:text-base font-light text-black">
						Untold
					</span>
				</div>

				{/* Center - Description */}
				<div className="hidden lg:block max-w-2xl text-center mx-auto">
					<div className="flex flex-col space-y-0 text-gray-400 font-light text-sm lg:text-base">
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
		</footer>
	);
};

export default HeroFooter;
