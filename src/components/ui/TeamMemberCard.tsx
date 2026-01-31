import type { TeamMember } from "../../data/team";

interface TeamMemberCardProps {
	member: TeamMember | null;
	className?: string;
}

/**
 * Reusable team member card component
 * Used in: Team section grid
 * Handles both filled member cells and empty cells with diagonal stripe pattern
 */
const TeamMemberCard = ({ member, className = "" }: TeamMemberCardProps) => {
	// Empty cell with diagonal stripes
	if (!member) {
		return (
			<div
				className={`w-full h-full ${className}`}
				style={{
					backgroundImage:
						"repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
				}}
			/>
		);
	}

	// Member cell with image and info
	return (
		<div className={`w-full h-full flex items-center justify-center ${className}`}>
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
};

export default TeamMemberCard;
