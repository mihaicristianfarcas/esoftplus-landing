import { Hexagon } from "lucide-react";
import { useScrollOpacity } from "../hooks/useScrollOpacity";

const HeroFooter = () => {
	const opacity = useScrollOpacity();

	return (
		<footer
			className="fixed bottom-0 left-0 right-0 z-40 px-5 py-5 transition-opacity duration-300"
			style={{ opacity }}
		>
			<div className="max-w-full flex items-center justify-between">
				{/* Left Side - Used By */}
				<div className="flex flex-col items-start gap-1">
					<span className="text-base font-light text-gray-400">Used By</span>
					<span className="text-base font-light text-black">Untold</span>
				</div>

				{/* Center - Description */}
				<div className="max-w-150 text-center mx-auto">
					<div className="flex flex-col space-y-0 text-gray-400 font-light">
						<p>
							Unlock instant analytics and reporting for your WMEnterprise data.
						</p>
						<p>No setup headaches, just powerful insights, ready to go</p>
					</div>
				</div>

				{/* Right Side - Scroll Indicator */}
				<div className="flex flex-col items-center gap-2">
					<div className="w-8 h-16 border-2 border-black rounded-full flex items-end justify-center pt-3 pb-2">
						<Hexagon className="w-4 h-4 fill-black text-black" />
					</div>
					<span className="text-base text-black tracking-wider">SCROLL</span>
				</div>
			</div>
		</footer>
	);
};

export default HeroFooter;
