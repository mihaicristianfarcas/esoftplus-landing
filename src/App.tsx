import FeaturesCarousel from "./components/FeaturesCarousel";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFooter from "./components/HeroFooter";
import LearnPlatform from "./components/LearnPlatform";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";

function App() {
	return (
		<div className="relative min-h-screen bg-white">
			<div className="relative z-10">
				<Header />
				<Hero />
				<HeroFooter />
				<FeaturesCarousel />
				<LearnPlatform />
				<Pricing />
				<FAQ />
			</div>
		</div>
	);
}

export default App;
