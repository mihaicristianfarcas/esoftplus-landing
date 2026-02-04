import gradientLeft from "../assets/gradient-left.png";
import gradientRight from "../assets/gradient-right.png";
import { teamGrid } from "../data/team";
import TeamMemberCard from "./ui/TeamMemberCard";

const Team = () => {
	return (
		<section className="relative w-full min-h-svh py-12 sm:py-16 xl:py-0 xl:h-screen flex flex-col justify-center overflow-hidden">
			{/* Left gradient */}
			<div
				className="absolute left-0 top-0 w-full lg:w-1/3 h-1/2 lg:h-full bg-contain bg-left bg-no-repeat pointer-events-none opacity-50 lg:opacity-100"
				style={{
					backgroundImage: `url(${gradientLeft})`,
					filter: "saturate(1.5) contrast(1.2) brightness(0.9)",
				}}
			/>

			{/* Right gradient */}
			<div
				className="absolute right-0 bottom-0 lg:top-0 w-full lg:w-1/3 h-1/2 lg:h-full bg-contain bg-right bg-no-repeat pointer-events-none opacity-50 lg:opacity-100"
				style={{
					backgroundImage: `url(${gradientRight})`,
					filter: "saturate(2) contrast(2)",
				}}
			/>

			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10">
				{/* Header */}
				<div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight mb-4 sm:mb-6">
						Meet the team
						<br />
						behind the project
					</h2>
					<p className="text-gray-500 text-sm sm:text-base md:text-md lg:text-lg max-w-xl mx-auto leading-relaxed px-4">
						With deep expertise in ERP integration and a passion for great user
						experiences, our team is here to help you unlock the full potential
						of your data, every step of the way.
					</p>
				</div>
			</div>

			{/* Top horizontal dashed line - full width */}
			<div className="w-full border-t border-dashed border-gray-300" />

			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Team Grid — Responsive cols with dashed borders */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-l border-r border-dashed border-gray-300">
					{teamGrid.map((cell) => (
						<div
							key={cell.id}
							className="border border-dashed border-gray-300 aspect-square md:aspect-auto"
						>
							<TeamMemberCard member={cell.member} />
						</div>
					))}
				</div>
			</div>

			{/* Bottom horizontal dashed line - full width */}
			<div className="w-full border-b border-dashed border-gray-300" />
		</section>
	);
};

export default Team;
