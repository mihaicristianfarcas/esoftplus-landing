export interface PricingTier {
	id: string;
	name: string;
	price: string;
	description: string;
	features: string[];
	isPopular?: boolean;
}

export const basicFeatures = [
	"Complete Analytics",
	"Daily summary",
	"Inventory Control",
	"PnL Overview",
];

export const proFeatures = [
	"Complete Analytics",
	"Daily summary",
	"Inventory Control",
	"PnL Overview",
];

export const enterpriseFeatures = [
	"Complete Analytics",
	"Daily summary",
	"Inventory Control",
	"PnL Overview",
];

export const pricingTiers: PricingTier[] = [
	{
		id: "basic",
		name: "Basic Plan",
		price: "$55",
		description:
			"Perfect for basic usage, seeing your profits and checking inventory.",
		features: basicFeatures,
	},
	{
		id: "pro",
		name: "Pro Plan",
		price: "$150",
		description:
			"Perfect for basic usage, seeing your profits and checking inventory.",
		features: proFeatures,
		isPopular: true,
	},
	{
		id: "enterprise",
		name: "Enterprise Plan",
		price: "$400",
		description:
			"Perfect for basic usage, seeing your profits and checking inventory.",
		features: enterpriseFeatures,
	},
];
