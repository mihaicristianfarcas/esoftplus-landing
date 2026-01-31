import andresImg from "../assets/team/andres.png";
import davidGImg from "../assets/team/david-g.png";
import faviuImg from "../assets/team/faviu.png";
import fonsImg from "../assets/team/fons.png";
import jayImg from "../assets/team/jay.png";
import robImg from "../assets/team/rob.png";
import saraImg from "../assets/team/sara.png";
import steveImg from "../assets/team/steve.png";

export interface TeamMember {
	name: string;
	role: string;
	image: string;
}

export type GridCell = {
	id: string;
	member: TeamMember | null;
};

// 3 rows x 4 columns grid layout matching the Figma design
export const teamGrid: GridCell[] = [
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
