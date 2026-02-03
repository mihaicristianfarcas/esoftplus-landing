import FeaturesCarousel from "./components/FeaturesCarousel";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LearnPlatform from "./components/LearnPlatform";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Team from "./components/Team";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="relative min-h-screen bg-white">
			{/* <a
				href="#main-content"
				className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-black focus:text-white focus:px-6 focus:py-3 focus:rounded-full focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				Skip to main content
			</a> */}
			<Header />
			<div className="relative h-full flex flex-col">
				<main id="main-content">
					<Hero />
					<FeaturesCarousel />
					<LearnPlatform />
					<Pricing />
					<FAQ />
					<Team />
				</main>
				<Footer />
			</div>
		</div>
	);
}

export default App;
