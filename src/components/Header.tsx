import { ArrowUpRight } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
	DrawerTitle,
	DrawerClose,
} from "@/components/ui/drawer";

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:py-6">
			<div className="max-w-full flex items-start justify-between">
				{/* Logo */}
				<div className="flex items-center">
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

				{/* Mobile Menu - Drawer */}
				<Drawer>
					<DrawerTrigger asChild>
						<button
							type="button"
							className="lg:hidden p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-md"
							aria-label="Open menu"
						>
							{/* Modern 2-bar menu icon */}
							<div className="flex flex-col gap-1.5 w-6">
								<span className="block h-0.5 w-6 bg-black rounded-full" />
								<span className="block h-0.5 w-4 bg-black rounded-full ml-auto" />
							</div>
						</button>
					</DrawerTrigger>
					<DrawerContent className="bg-white px-6 pb-8">
						<DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>

						{/* Nav Links */}
						<nav className="flex flex-col gap-5">
							<DrawerClose asChild>
								<a
									href="#home"
									className="text-2xl font-light hover:text-gray-600 transition-colors"
								>
									Home
								</a>
							</DrawerClose>
							<DrawerClose asChild>
								<a
									href="#contact"
									className="text-2xl font-light hover:text-gray-600 transition-colors"
								>
									Contact Us
								</a>
							</DrawerClose>
							<DrawerClose asChild>
								<a
									href="#pricing"
									className="text-2xl font-light hover:text-gray-600 transition-colors"
								>
									Pricing
								</a>
							</DrawerClose>
						</nav>

						{/* Bottom Section */}
						<div className="flex flex-col gap-5 mt-8">
							<div className="flex flex-col gap-1 pt-5 border-t border-gray-200">
								<span className="text-xs font-light text-gray-400 uppercase tracking-widest">
									Built On
								</span>
								<span className="text-base font-light">WME Enterprise</span>
							</div>

							<DrawerClose asChild>
								<a
									href="#demo"
									className="flex items-center justify-between bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors"
								>
									<span className="text-lg">Try Demo</span>
									<ArrowUpRight className="h-5 w-5" />
								</a>
							</DrawerClose>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</header>
	);
};

export default Header;
