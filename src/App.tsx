import Centralise from "./components/CentraliseDark";
import CustomDashboard from "./components/CustomDashboard";
import CustomDashboardDark from "./components/CustomDashboardDark";
import FeaturesCarousel from "./components/FeaturesCarousel";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFooter from "./components/HeroFooter";
import TrackFeature from "./components/Centralise";
import LearnPlatform from "./components/LearnPlatform";

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
			</div>
		</div>
	);
}

export default App;
