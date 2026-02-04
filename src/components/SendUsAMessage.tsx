import { ArrowRight } from "lucide-react";
import SendIcon from "../assets/send-paper-plane.svg";

export default function SendUsAMessage({
	email = "support@esoftplus.com",
	isFooter = false,
}: {
	email?: string;
	isFooter?: boolean;
}) {
	return (
		<a
			href={`mailto:${email}`}
			className={`cursor-pointer flex items-center justify-between w-full ${isFooter && "md:w-auto md:max-w-md"} text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg p-2 -m-2 hover:bg-white/5 transition-colors`}
		>
			<div className="flex items-center gap-3 text-white">
				<img src={SendIcon} alt="" className="w-8 h-8 shrink-0" />
				<div>
					<p className="text-lg mb-0.5">Send us a message.</p>
					<span className="text-gray-400 text-lg hover:text-white transition-colors">
						support@esoftplus.com
					</span>
				</div>
			</div>
			<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center ml-auto shrink-0">
				<ArrowRight className="w-6 h-6 text-black" />
			</div>
		</a>
	);
}
