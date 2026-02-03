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
		<div
			className={`w-full h-full flex items-center justify-center p-2 lg:p-4 ${className}`}
		>
			<div className="flex flex-col items-start w-fit">
				<img
					src={member.image}
					alt={member.name}
					className="w-30 sm:w-40 md:w-50 max-w-full aspect-square object-cover"
				/>
				<h3 className="text-xl lg:text-2xl font-medium text-black leading-tight mt-4">
					{member.name}
				</h3>
				<p className="text-sm lg:text-base font-extralight text-gray-400">
					{member.role}
				</p>
			</div>
		</div>
	);
};

export default TeamMemberCard;
