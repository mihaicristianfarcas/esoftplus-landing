import gradientLeft from "../assets/gradient-left.png";
import gradientRight from "../assets/gradient-right.png";
import { teamGrid } from "../data/team";
import TeamMemberCard from "./ui/TeamMemberCard";

const Team = () => {
	return (
		<section className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden">
			{/* Left gradient */}
			<div
				className="absolute left-0 top-0 w-1/3 h-full bg-contain bg-left bg-no-repeat pointer-events-none"
				style={{
					backgroundImage: `url(${gradientLeft})`,
					filter: "saturate(1.5) contrast(1.2) brightness(0.9)",
				}}
			/>

			{/* Right gradient */}
			<div
				className="absolute right-0 top-0 w-1/3 h-full bg-contain bg-right bg-no-repeat pointer-events-none"
				style={{
					backgroundImage: `url(${gradientRight})`,
					filter: "saturate(2) contrast(2)",
				}}
			/>

			<div className="max-w-7xl mx-auto w-full px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6">
						Meet the team
						<br />
						behind the project
					</h2>
					<p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
						With deep expertise in ERP integration and a passion for great user
						experiences, our team is here to help you unlock the full potential
						of your data, every step of the way.
					</p>
				</div>
			</div>

			{/* Top horizontal dashed line - full width */}
			<div className="w-full border-t border-dashed border-gray-300" />

			<div className="max-w-7xl mx-auto w-full px-8">
				{/* Team Grid — 4 cols x 3 rows with dashed borders */}
				<div className="grid grid-cols-4 border-l border-r border-dashed border-gray-300 aspect-32/21">
					{teamGrid.map((cell) => (
						<div key={cell.id} className="border border-dashed border-gray-300">
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
