import { useEffect, useState } from "react";

const HeroFooter = () => {
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;

			// Calculate opacity: fade out as we scroll down
			// Starts fading at 0, fully transparent at window height
			const newOpacity = Math.max(0, 1 - scrollPosition / windowHeight);
			setOpacity(newOpacity);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<footer
			className="fixed bottom-0 left-0 right-0 z-40 px-5 py-5 transition-opacity duration-300"
			style={{ opacity }}
		>
			<div className="max-w-full flex items-start justify-between">
				{/* Left Side - Used By */}
				<div className="flex flex-col items-start gap-1">
					<span className="text-base font-medium text-gray-400">Used By</span>
					<span className="text-base font-medium text-black">Untold</span>
				</div>

				{/* Center - Description */}
				<div className="max-w-[600px] text-center mx-auto">
					<div className="flex flex-col space-y-0 text-gray-400 font-semibold">
						<p>Unlock instant analytics and reporting for your WMEnterprise data.</p>
						<p>No setup headaches, just powerful insights, ready to go</p>
					</div>
				</div>

				{/* Right Side - Scroll Indicator */}
				<div className="flex flex-col items-center gap-2">
					<div className="w-8 h-12 border-2 border-black rounded-full flex items-start justify-center p-2">
						<div className="w-1.5 h-3 bg-black rounded-full animate-bounce" />
					</div>
					<span className="text-xs font-semibold text-black tracking-wider">
						SCROLL
					</span>
				</div>
			</div>
		</footer>
	);
};

export default HeroFooter;
