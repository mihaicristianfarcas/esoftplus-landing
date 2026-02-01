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
		<section className="relative w-full h-full">
			<div className="max-w-7xl mx-auto w-full">
				{/* Outer Container: Left content + Right card */}
				<div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
					{/* Left Container: Title + Questions */}
					<div className="flex flex-col items-start w-full lg:w-[60%]">
						{/* Title */}
						<h2 className="section-title mb-10">
							Frequently asked <br />
							<span className="text-gray-300">questions</span>
						</h2>

						{/* FAQ Accordion */}
						<Accordion
							type="single"
							collapsible
							defaultValue="who-am-i"
							className="w-full"
						>
							{faqItems.map((item) => (
								<AccordionItem key={item.id} value={item.id}>
									<AccordionTrigger className="text-lg lg:text-xl font-normal text-black hover:no-underline py-6 text-left">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 leading-relaxed pr-8 text-sm lg:text-base">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					{/* Right Column - Contact Card */}
					<div className="w-full lg:w-[35%] shrink-0">
						<ContactCard />
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ;
