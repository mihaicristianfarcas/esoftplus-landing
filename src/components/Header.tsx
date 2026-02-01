import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:py-6">
			<div className="max-w-full flex items-start justify-between">
				{/* Logo */}
				<div className="flex items-start align-top">
					<span className="text-2xl lg:text-3xl font-medium tracking-tight">
						Esoftplus
						<span className="text-[10px] font-light align-text-top">®</span>
					</span>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex flex-row items-start gap-24 xl:gap-32">
					<div className="flex flex-col items-start gap-1 mr-6">
						<span className="text-lg font-light text-gray-400">Built On</span>
						<span className="text-lg font-light">WME Enterprise</span>
					</div>
					<nav className="flex flex-col text-lg items-start align-baseline gap-1">
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
						className="flex items-center text-lg gap-2 text-black hover:text-gray-600 transition-colors"
					>
						Try Demo
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="lg:hidden p-2"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobile Navigation Dropdown */}
			{isMenuOpen && (
				<div className="lg:hidden absolute top-full left-0 right-0 border-t bg-white border-gray-100 p-6 flex flex-col gap-6 shadow-xl">
					<nav className="flex flex-col gap-4">
						<a
							href="#home"
							className="text-sm font-light"
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</a>
						<a
							href="#contact"
							className="text-sm font-light"
							onClick={() => setIsMenuOpen(false)}
						>
							Contact Us
						</a>
						<a
							href="#pricing"
							className="text-sm font-light"
							onClick={() => setIsMenuOpen(false)}
						>
							Pricing
						</a>
					</nav>
					<div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
						<span className="text-xs font-light text-gray-400 uppercase tracking-widest">
							Built On
						</span>
						<span className="text-sm font-light">WME Enterprise</span>
					</div>
					<a
						href="#demo"
						className="flex items-center justify-between bg-black text-white px-6 py-3 rounded-full"
						onClick={() => setIsMenuOpen(false)}
					>
						Try Demo
						<ArrowUpRight className="h-5 w-5" />
					</a>
				</div>
			)}
		</header>
	);
};

export default Header;
