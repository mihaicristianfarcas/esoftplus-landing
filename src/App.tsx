import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFooter from "./components/HeroFooter";

function App() {
	return (
		<div className="relative min-h-screen bg-white">
			{/* Content */}
			<div className="relative z-10">
				<Header />
				<Hero />
				<HeroFooter />
			</div>
		</div>
	);
}

export default App;
