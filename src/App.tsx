import FeaturesCarousel from "./components/FeaturesCarousel";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFooter from "./components/HeroFooter";
import LearnPlatform from "./components/LearnPlatform";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Team from "./components/Team";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="relative min-h-screen bg-white">
			<div className="relative z-10 h-full flex flex-col">
				<Header />
				<Hero />
				<HeroFooter />
				<FeaturesCarousel />
				<LearnPlatform />
				<Pricing />
				<FAQ />
				<Team />
				<Footer />
			</div>
		</div>
	);
}

export default App;
