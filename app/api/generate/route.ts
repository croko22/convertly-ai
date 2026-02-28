import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { courseLandingPageSchema, type CourseLandingPage } from "@/lib/schemas";
import { zodToJsonSchema } from "zod-to-json-schema";

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sourceUrl, description } = body;

        // We need at least a description or a URL
        if (!sourceUrl && !description) {
            return NextResponse.json(
                { error: "Missing sourceUrl or description" },
                { status: 400 }
            );
        }

        let prompt = `You are an expert copywriter and marketer. Your goal is to create a high-converting landing page for a course.\n\n`;

        if (sourceUrl) {
            prompt += `The course is based on this URL (though you can't surf it natively, use it as context if it's a known resource or video title): ${sourceUrl}\n`;
        }

        if (description) {
            prompt += `Here is the description of the course, what it teaches, and who it is for: \n"${description}"\n\n`;
        }

        prompt += `Generate a structured landing page following the required JSON schema strictly. Focus on a compelling headline, benefit-driven features, and clear pricing.`;

        // Convert Zod schema to a format Gemini expects (or use Gemini's built-in schema if using beta SDK)
        const responseSchema: Schema = {
            type: Type.OBJECT,
            properties: {
                hero: {
                    type: Type.OBJECT,
                    properties: {
                        headline: { type: Type.STRING, description: "A clear, high-converting headline focusing on the outcome." },
                        subheadline: { type: Type.STRING, description: "A supporting subheadline going into more detail." },
                        ctaText: { type: Type.STRING, description: "The text on the primary call to action button, e.g., 'Get Access Now'" },
                    },
                    required: ["headline", "subheadline", "ctaText"]
                },
                features: {
                    type: Type.ARRAY,
                    description: "The main modules or benefits of the course.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: "The name of the feature or module." },
                            description: { type: Type.STRING, description: "A short explanation of what the student will learn." },
                            icon: { type: Type.STRING, description: "A suggested Lucide icon name, e.g., 'Video', 'BookOpen'" },
                        },
                        required: ["title", "description"]
                    }
                },
                pricing: {
                    type: Type.OBJECT,
                    properties: {
                        price: { type: Type.NUMBER, description: "The price of the course." },
                        currency: { type: Type.STRING, description: "e.g. USD, EUR" },
                        guarantee: { type: Type.STRING, description: "e.g. '30-Day Money-Back Guarantee'" },
                    },
                    required: ["price", "currency"]
                }
            },
            required: ["hero", "features", "pricing"]
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                systemInstruction: "You are a landing page generator. You MUST return strictly valid JSON matching the exact schema."
            }
        });

        if (!response.text) {
            return NextResponse.json(
                { error: "Failed to generate content" },
                { status: 500 }
            );
        }

        const generatedText = response.text;
        const parsedData = JSON.parse(generatedText) as CourseLandingPage;

        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error("Error generating landing page:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
