import { ArrowRight } from "lucide-react";
import SendIcon from "../assets/send-paper-plane.svg";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
	{
		id: "who-am-i",
		question: "Who am I?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
	},
	{
		id: "what-does-world-need",
		question: "What does the world need?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "how-create-value-1",
		question: "How can I create value?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "what-tools-1",
		question: "What tools do I need?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "sustain-vision",
		question: "How do I sustain my vision?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "how-create-value-2",
		question: "How can I create value?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "what-tools-2",
		question: "What tools do I need?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];

const FAQ = () => {
	return (
		<section className="relative w-full bg-white py-36">
			<div className="max-w-7xl mx-auto w-full h-full px-8 relative">
				{/* Outer Container: Left content + Right card */}
				<div className="flex flex-row items-start justify-between gap-12">
					{/* Left Container: Title + Questions */}
					<div className="flex flex-col items-start w-[60%]">
						{/* Title */}
						<h2 className="text-6xl md:text-7xl font-light leading-tight tracking-tighter mb-10">
							Frequently asked <br />
							<span className="text-gray-300">questions</span>
						</h2>

						{/* FAQ Accordion */}
						<Accordion
							type="single"
							collapsible
							defaultValue="who-am-i"
							className="w-full min-h-175"
						>
							{faqItems.map((item) => (
								<AccordionItem key={item.id} value={item.id}>
									<AccordionTrigger className="text-xl font-normal text-black hover:no-underline py-6">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed pr-8 text-base">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					{/* Right Column - Contact Card */}
					<div className="w-[35%] shrink-0 self-start top-8">
						<div className="flex flex-col justify-between bg-[#1a1a1a] rounded-3xl p-8 h-[450px]">
							<div>
								{/* Header */}
								<h3 className="text-white text-3xl font-light mb-2">
									Need Clarification?
								</h3>
								<p className="text-gray-400 font-extralight text-sm">
									Book a call or message us at any time.
								</p>
							</div>
							<div>
								{/* Book a Call Button */}
								<button
									type="button"
									className="w-full bg-white text-black py-3 pl-6 pr-4 rounded-full flex items-center justify-between hover:bg-gray-100 transition-all group mb-6"
								>
									<span className="font-medium">Book a call</span>
									<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
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
												href="mailto:support@esoftplus.com"
												className="text-gray-400 hover:text-gray-700 transition-colors"
											>
												support@esoftplus.com
											</a>
										</div>
									</div>
									<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center ml-auto shrink-0">
										<ArrowRight className="w-4 h-4 text-black" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ;
