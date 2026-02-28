import { z } from "zod";

// --- FORM SCHEMAS ---

export const generateLandingPageSchema = z.object({
    sourceUrl: z.string().url().optional().or(z.literal("")),
    description: z.string().optional(),
}).refine(
    (data) => data.sourceUrl || (data.description && data.description.trim().length > 0),
    {
        message: "You must provide either a YouTube URL or a description.",
        path: ["description"],
    }
);

export type GenerateLandingPageInput = z.infer<typeof generateLandingPageSchema>;

// --- AI OUTPUT SCHEMAS ---

export const featureSchema = z.object({
    title: z.string().describe("The name of the feature or module."),
    description: z.string().describe("A short explanation of what the student will learn."),
    icon: z.string().optional().describe("A suggested Lucide icon name, e.g., 'Video', 'BookOpen'"),
});

export const testimonialSchema = z.object({
    authorName: z.string(),
    quote: z.string(),
    role: z.string().optional(),
});

export const faqSchema = z.object({
    question: z.string(),
    answer: z.string(),
});

// The structure of the AI-generated JSON saved to the database.
export const courseLandingPageSchema = z.object({
    hero: z.object({
        headline: z.string().describe("A clear, high-converting headline focusing on the outcome."),
        subheadline: z.string().describe("A supporting subheadline going into more detail."),
        ctaText: z.string().describe("The text on the primary call to action button, e.g., 'Get Access Now'"),
    }),
    features: z.array(featureSchema).describe("The main modules or benefits of the course."),
    aboutCreator: z.object({
        heading: z.string(),
        bio: z.string(),
    }).optional().describe("A section about the instructor or creator."),
    testimonials: z.array(testimonialSchema).optional().describe("Fictional or extracted testimonials for social proof."),
    faqs: z.array(faqSchema).optional().describe("Frequently asked questions about the course."),
    pricing: z.object({
        price: z.number().describe("The price of the course."),
        currency: z.string().describe("e.g. USD, EUR").default("USD"),
        guarantee: z.string().optional().describe("e.g. '30-Day Money-Back Guarantee'"),
    }),
});

export type CourseLandingPage = z.infer<typeof courseLandingPageSchema>;
