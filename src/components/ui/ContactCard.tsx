import { ArrowRight } from "lucide-react";
import { memo } from "react";
import SendIcon from "../../assets/send-paper-plane.svg";

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
				className={`flex flex-col justify-between bg-[#1a1a1a] rounded-3xl p-8 h-[450px] ${className}`}
			>
				<div>
					{/* Header */}
					<h3 className="text-white text-3xl font-light mb-2">{title}</h3>
					<p className="text-gray-400 font-extralight text-sm">{description}</p>
				</div>
				<div>
					{/* Book a Call Button */}
					<button
						type="button"
						className="w-full bg-white text-black py-3 pl-6 pr-4 rounded-full flex items-center justify-between hover:bg-gray-100 transition-all group mb-6"
					>
						<span className="font-medium">{buttonText}</span>
						<div className="icon-circle">
							<ArrowRight className="w-4 h-4 text-white" />
						</div>
					</button>
					{/* Email Option */}
					<div className="flex items-center justify-between w-full text-white pr-4">
						<div className="flex items-center gap-3 text-white">
							<img src={SendIcon} alt="" className="w-7 h-7 shrink-0" />
							<div>
								<p className="text-sm mb-0.5">Or send an email.</p>
								<a
									href={`mailto:${email}`}
									className="text-gray-400 hover:text-gray-700 transition-colors"
								>
									{email}
								</a>
							</div>
						</div>
						<div className="icon-circle-white ml-auto shrink-0">
							<ArrowRight className="w-4 h-4 text-black" />
						</div>
					</div>
				</div>
			</div>
		);
	},
);

ContactCard.displayName = "ContactCard";

export default ContactCard;
