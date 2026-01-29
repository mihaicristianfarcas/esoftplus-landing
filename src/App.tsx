import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFooter from "./components/HeroFooter";
import backgroundPattern from "./assets/bg.png";

function App() {
	return (
		<div className="relative min-h-screen bg-white">
			{/* Background Pattern - Fixed to viewport */}
			<div
				className="fixed inset-0 w-screen h-screen bg-center bg-no-repeat pointer-events-none"
				style={{
					backgroundImage: `url(${backgroundPattern})`,
					backgroundSize: "100% 100%",
				}}
			/>

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
