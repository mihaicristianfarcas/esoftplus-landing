import FeaturesCarousel from "./components/FeaturesCarousel";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFooter from "./components/HeroFooter";
import LearnPlatform from "./components/LearnPlatform";
import Pricing from "./components/Pricing";

function App() {
	return (
		<div className="relative min-h-screen bg-white">
			{/* Content */}
			<div className="relative z-10">
				<Header />
				<Hero />
				<HeroFooter />
				<FeaturesCarousel />
				<LearnPlatform />
				<Pricing />
			</div>
		</div>
	);
}

export default App;
