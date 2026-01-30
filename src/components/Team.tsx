import andresImg from "../assets/team/andres.png";
import davidGImg from "../assets/team/david-g.png";
import faviuImg from "../assets/team/faviu.png";
import fonsImg from "../assets/team/fons.png";
import jayImg from "../assets/team/jay.png";
import robImg from "../assets/team/rob.png";
import saraImg from "../assets/team/sara.png";
import steveImg from "../assets/team/steve.png";
import gradientLeft from "../assets/gradient-left.png";
import gradientRight from "../assets/gradient-right.png";

type TeamMember = {
	name: string;
	role: string;
	image: string;
} | null;

type GridCell = {
	id: string;
	member: TeamMember;
};

// 3 rows x 4 columns grid layout matching the Figma design
const grid: GridCell[] = [
	{
		id: "faviu",
		member: { name: "Faviu", role: "Founder EsoftPlus", image: faviuImg },
	},
	{ id: "empty-1", member: null },
	{
		id: "david-g",
		member: { name: "David G.", role: "Lead Engineer", image: davidGImg },
	},
	{ id: "empty-2", member: null },

	{ id: "rob", member: { name: "Rob", role: "Lead Engineer", image: robImg } },
	{ id: "sara", member: { name: "Sara", role: "Editorial", image: saraImg } },
	{ id: "empty-3", member: null },
	{
		id: "fons",
		member: { name: "Fons", role: "Founder Officer", image: fonsImg },
	},

	{
		id: "steve",
		member: { name: "Steve", role: "Founder EsoftPlus", image: steveImg },
	},
	{ id: "empty-4", member: null },
	{
		id: "andres",
		member: { name: "Andres", role: "Chief Staff", image: andresImg },
	},
	{ id: "jay", member: { name: "Jay", role: "Lead Engineer", image: jayImg } },
];

const EmptyCell = () => (
	<div
		className="w-full h-full"
		style={{
			backgroundImage:
				"repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
		}}
	/>
);

const MemberCell = ({
	member,
}: {
	member: { name: string; role: string; image: string };
}) => (
	<div className="w-full h-full flex items-center justify-center">
		<div className="flex flex-col items-start">
			<img
				src={member.image}
				alt={member.name}
				className="w-40 h-40 object-cover"
			/>
			<h3 className="text-2xl font-medium text-black leading-tight mt-4">
				{member.name}
			</h3>
			<p className="text-base font-extralight text-gray-400">{member.role}</p>
		</div>
	</div>
);

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
					{grid.map((cell) => (
						<div key={cell.id} className="border border-dashed border-gray-300">
							{cell.member ? (
								<MemberCell member={cell.member} />
							) : (
								<EmptyCell />
							)}
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
