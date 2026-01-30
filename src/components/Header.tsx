import { ArrowUpRight } from "lucide-react";

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 py-6">
			<div className="max-w-full flex items-start justify-between">
				{/* Logo */}
				<div className="flex items-start align-top">
					<span className="text-2xl font-medium tracking-tight">
						Esoftplus
						<span className="text-[10px] font-light align-text-top">®</span>
					</span>
				</div>

				<div className="flex flex-row items-start gap-24">
					<div className="flex flex-col items-start gap-1 mr-6">
						<span className="text-base font-light text-gray-400">Built On</span>
						<span className="text-base font-light">WME Enterprise</span>
					</div>
					<nav className="flex flex-col items-start align-baseline gap-1">
						<a
							href="#home"
							className="text-black font-light hover:text-gray-600 transition-colors"
						>
							Home
						</a>
						<a
							href="#contact"
							className="text-black font-light hover:text-gray-600 transition-colors"
						>
							Contact Us
						</a>
						<a
							href="#pricing"
							className="text-black font-light hover:text-gray-600 transition-colors"
						>
							Pricing
						</a>
					</nav>
					<a
						href="#demo"
						className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
					>
						Try Demo
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
