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
				className={`flex flex-col justify-between bg-[#1a1a1a] rounded-3xl p-6 lg:p-8 min-h-[320px] lg:h-[360px] ${className}`}
			>
				<div>
					{/* Header */}
					<h3 className="text-white text-2xl lg:text-3xl font-light mb-2">
						{title}
					</h3>
					<p className="text-gray-400 font-extralight text-xs lg:text-sm">
						{description}
					</p>
				</div>
				<div>
					{/* Book a Call Button */}
					<button
						type="button"
						className="w-full bg-white text-black py-3 pl-6 pr-4 rounded-full flex items-center justify-between hover:bg-gray-100 transition-all group mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
						aria-label="Book a call"
					>
						<span className="font-medium text-sm lg:text-base">
							{buttonText}
						</span>
						<div className="icon-circle">
							<ArrowRight className="w-4 h-4 text-white" />
						</div>
					</button>
					{/* Email Option */}
					<a
						href={`mailto:${email}`}
						className="flex items-center justify-between w-full text-white pr-2 lg:pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded-lg p-2 -m-2 hover:bg-white/5 transition-colors"
					>
						<div className="flex items-center gap-3 text-white">
							<img
								src={SendIcon}
								alt=""
								className="w-6 h-6 lg:w-7 lg:h-7 shrink-0"
							/>
							<div>
								<p className="text-xs lg:text-sm mb-0.5">Or send an email.</p>
								<span className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm">
									{email}
								</span>
							</div>
						</div>
						<div className="icon-circle-white ml-auto shrink-0">
							<ArrowRight className="w-4 h-4 text-black" />
						</div>
					</a>
				</div>
			</div>
		);
	},
);

ContactCard.displayName = "ContactCard";

export default ContactCard;
