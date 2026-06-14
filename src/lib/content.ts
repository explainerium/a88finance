/**
 * Shared marketing content. Centralised so pages and the (future) blog
 * dashboard can read from one source of truth.
 */

export type Service = {
	title: string
	description: string
	icon: string // lucide icon key, resolved in the rendering component
	href?: string
}

export const services: Service[] = [
	{
		title: "Vehicle Finance",
		description:
			"Compare car, motorbike, caravan, and recreational vehicle finance with fast pre-approvals and clear guidance.",
		icon: "car",
		href: "/services/car-finance",
	},
	{
		title: "Business Finance",
		description:
			"Loans for equipment, vehicles, cashflow, and growth, including low-doc and asset finance options.",
		icon: "building",
		href: "/services/business-loans",
	},
	{
		title: "Personal Loans and Debt Consolidation",
		description:
			"Simple personal loans for weddings, renovations, holidays, debt consolidation, or when you just need extra cash.",
		icon: "user",
		href: "/services/personal-loans",
	},
	{
		title: "Specialty Finance",
		description:
			"Supportive options for bad credit, ex-bankruptcy, ATO debt, and low-income clients.",
		icon: "shield",
	},
	{
		title: "Truck Loans",
		description:
			"Fast, flexible finance for new or used trucks, with simple pre-approvals and competitive rates to keep your business moving.",
		icon: "truck",
	},
	{
		title: "Jetski, Boat & Caravan Loans",
		description:
			"Finance options for boats, caravans, jet skis, and recreational vehicles so you can enjoy the lifestyle you want.",
		icon: "sailboat",
	},
	{
		title: "Business & Equipment Finance",
		description:
			"Support for small businesses needing vehicles, tools, machinery, or cash flow solutions.",
		icon: "wrench",
	},
	{
		title: "Low-Doc & Self-Employed Loans",
		description:
			"Flexible loan options designed for freelancers, contractors, and business owners without full financials.",
		icon: "fileText",
	},
	{
		title: "Bad Credit & Ex-Bankruptcy Loans",
		description:
			"Supportive finance solutions for clients rebuilding after credit issues, low income, or past bankruptcy.",
		icon: "heartHandshake",
	},
]

export const processSteps = [
	{ title: "Enquire", text: "Simple conversation to understand your needs." },
	{ title: "Compare", text: "I review lenders and find your best options." },
	{ title: "Apply", text: "Pre-approval completed in minutes." },
	{ title: "Settle", text: "Drive away or move forward with confidence." },
]

export type StoryPersona = {
	title: string
	text: string
	icon: string
	variant: "fam" | "mig" | "biz"
	image: string
}

export const storyPersonas: StoryPersona[] = [
	{
		title: "Families & Single Parents",
		text: "Reliable, affordable loan options designed to support everyday family needs, from upgrading your car to handling unexpected expenses. I'm here to make the process simple and stress-free, no matter your situation.",
		icon: "users",
		variant: "fam",
		image: "/services/families.jpg",
	},
	{
		title: "Migrants & Visa Holders",
		text: "Starting a new life in Australia comes with challenges. I offer friendly, flexible finance solutions for migrants who may not have long credit histories. Clear guidance, no pressure, and real support, every step of the way.",
		icon: "globe",
		variant: "mig",
		image: "/services/migrants.webp",
	},
	{
		title: "Business & Self-Employed",
		text: "Whether you're a tradie, freelancer, or running a growing business, you need finance that works the way you do. I help you access low-doc loans, vehicles, tools, and equipment, fast, simple, and tailored to your cash flow.",
		icon: "store",
		variant: "biz",
		image: "/services/business.jpg",
	},
]

export type Testimonial = {
	name: string
	initials: string
	gold?: boolean
	quote: string
	/** Star rating 1–5. Defaults to 5 when omitted. */
	rating?: number
	/** Profile photo URL (e.g. a Google photo URL or a file in /public). */
	image?: string
}

export const testimonials: Testimonial[] = [
	{
		name: "Lara Mizhiritsky",
		initials: "LM",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjUMMHGWvxqqAg0Hhq8XO9qlMT6tNqd60EykVMwuxg40EeZqFDrZSg=w36-h36-p-rp-mo-br100",
		quote:
			"Jessica was extremely helpful and patient helping my husband and I with our financial commitments. Her communication was delieved outstanding at all times. Thanks for everything Jess highly recommended 🙏🏻",
	},
	{
		name: "pasathk",
		initials: "P",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjUSdzOmEOj6k5-s1nY52oJ9OY89p9oSF6Q1mhHL3hngTABj1H4c=w36-h36-p-rp-mo-br100",
		quote:
			"Seamless experience from start to finish. A88 handled my car loan promptly and took all the stress out of the paperwork. Jess was very efficient and maintained excellent communication throughout. Very attractive rates and truly hassle-free service.",
	},
	{
		name: "Diem Nguyen",
		initials: "DN",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjX_zvLnRXKaHfpwMFqH_T1s1GeJrCUIwh6UslGx-7meiUWpKA=w36-h36-p-rp-mo-br100",
		quote:
			"Jess helped me with my finance and explained the process and made me feel comfortable. so happy with my car loan. will recommend to my family and friends!",
	},
	{
		name: "Tracy Olive",
		initials: "TO",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjUQ9mgeBklWqOM8us1I_unTYLv-gfH4ixVEC_Rr7hNr3UkSKfE8=w36-h36-p-rp-mo-br100",
		quote:
			"Jessica is incredible! Hands down the best finance broker I’ve worked with. She’s sharp, proactive, and makes the entire process feel effortless. Her communication is flawless, her knowledge is next-level, and she genuinely fights for the best outcome. If you want a broker who delivers results with style and confidence, Jessica is your girl. Absolutely amazing!",
	},
	{
		name: "Sameer Lalwani",
		initials: "TO",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjUGSyaDOvEyYlIR0hoGpGuuAinUj6XambDTuEQI4lSJIlOPpmPS=w36-h36-p-rp-mo-br100",
		quote:
			"Jessica has always been incredibly helpful throughout the process and consistently did her best to keep everything moving smoothly. Highly recommended!!!",
	},
	{
		name: "Rui Ferreira",
		initials: "TO",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjU8naJM3avg8DElTygi_EwY89WETcJFTymlFVKULZ33SHqssRgO=w36-h36-p-rp-mo-br100",
		quote:
			"It was such a delight dealing Jessica. She made our experience an absolute breeze. Keep up the great work!",
	},
	{
		name: "Alvin Eduardo Arcilla",
		initials: "TO",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjVca5J19tRel8kWioO-Ge-kCH_l94ZhttUqjsWg6bwBkgNEwQ4=w36-h36-p-rp-mo-br100",
		quote:
			"I had an amazing experience working with Jessica Lam. She was incredibly accommodating and really took the time to listen to my situation. I’m currently on a student visa and needed a car quite abruptly, and she made everything happen smoothly and much faster than I expected. Jessica was supportive, understanding, and genuinely cared about helping me get the best outcome. Thank you so much, Jessica, for making this whole process stress free and quick. I highly recommend her to anyone looking for finance support. Truly outstanding service!",
	},
	{
		name: "emma gatt",
		initials: "TO",
		rating: 5,
		image:
			"https://lh3.googleusercontent.com/a-/ALV-UjVJRxdCJXcgnf5wdZE4zPILpjwTvShz7nb49cySF83fQSEKJehp=w36-h36-p-rp-mo-ba12-br100",
		quote:
			"Jess is amazing would definitely recommend her. Made everything so easy and straightforward, will definitely be using Jess for future finance, and passing her details on to family and friends.",
	},
]

export type BlogPost = {
	slug: string
	title: string
	category: string
	categoryIcon: string
	excerpt: string
	gradient?: "g2" | "g3"
	coverImage?: string
	coverImageAlt?: string
}

export const blogPosts: BlogPost[] = [
	{
		slug: "five-signs-ready-for-business-loan",
		title: "Five Signs You're Ready for a Business Loan",
		category: "Business",
		categoryIcon: "building",
		excerpt:
			"Securing a business loan is a significant decision. Rather than applying whenever you think you might need it, look for these signs first.",
	},
	{
		slug: "should-you-refinance-your-car-loan",
		title: "Should You Refinance Your Current Car Loan?",
		category: "Car Finance",
		categoryIcon: "car",
		excerpt:
			"Refinancing a car loan means replacing your current loan with a new one, typically to reduce your interest rate or repayments.",
		gradient: "g2",
	},
	{
		slug: "bad-credit-doesnt-mean-no-options",
		title: "Bad Credit Doesn't Mean No Options",
		category: "Credit",
		categoryIcon: "shield",
		excerpt:
			"A poor credit history can feel like a permanent limitation, but it's not a life sentence. Here is what you can do next.",
		gradient: "g3",
	},
]

export const homeStats = [
	{ value: "20+", label: "Years Experience" },
	{ value: "Fast", label: "Pre-Approvals" },
	{ value: "1:1", label: "Personal Support" },
	{ value: "35+", label: "Lenders" },
]
