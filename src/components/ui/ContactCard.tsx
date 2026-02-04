import { ArrowRight } from "lucide-react";
import { memo } from "react";
import SendIcon from "../../assets/send-paper-plane.svg";
import SendUsAMessage from "../SendUsAMessage";

interface ContactCardProps {
	title?: string;
	description?: string;
	buttonText?: string;
	email?: string;
	className?: string;
}

const ContactCard = memo(
	({
		title = "Need Clarification?",
		description = "Book a call or message us at any time.",
		buttonText = "Book a call",
		email = "support@esoftplus.com",
		className = "",
	}: ContactCardProps) => {
		return (
			<div
				className={`flex flex-col justify-between bg-[#1a1a1a] rounded-3xl p-6 lg:p-8 min-h-[320px] lg:h-[360px] ${className}`}
			>
				<div>
					{/* Header */}
					<h3 className="text-white text-3xl lg:text-4xl font-light mb-2">
						{title}
					</h3>
					<p className="text-gray-400 font-extralight text-lg lg:text-xl">
						{description}
					</p>
				</div>
				<div className="flex flex-col gap-4">
					{/* Book a Call Button */}
					<button
						type="button"
						className="cursor-pointer w-full whitespace-nowrap bg-white text-black py-3 pl-6 pr-4 rounded-full flex items-center justify-between hover:bg-gray-100 transition-all group no-shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
						aria-label="Book a call"
					>
						<span className="font-medium text-md md:text-lg">{buttonText}</span>
						<div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
							<ArrowRight className="w-6 h-6 text-white" />
						</div>
					</button>
					{/* Email Option */}
					<SendUsAMessage />
				</div>
			</div>
		);
	},
);

ContactCard.displayName = "ContactCard";

export default ContactCard;
