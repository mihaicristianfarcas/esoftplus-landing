import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import ContactCard from "@/components/ui/ContactCard";
import { faqItems } from "../data/faq";

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
						<ContactCard />
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ;
