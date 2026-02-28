import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock the generate route
// Since the route initializes the Gemini client at the top level, we mock the @google/genai library globally.
const mockGenerateContent = vi.fn();
vi.mock('@google/genai', () => ({
    GoogleGenAI: vi.fn().mockImplementation(() => ({
        models: {
            generateContent: mockGenerateContent,
        },
    })),
    Type: { OBJECT: 'OBJECT', STRING: 'STRING', ARRAY: 'ARRAY', NUMBER: 'NUMBER' },
}));

// Import the API route dynamically after mocking
const { POST } = await import('../route');

describe('POST /api/generate', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if no sourceUrl or description is provided', async () => {
        const req = new NextRequest('http://localhost:3000/api/generate', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const res = await POST(req);
        expect(res.status).toBe(400);

        const json = await res.json();
        expect(json.error).toBe('Missing sourceUrl or description');
    });

    it('should call Gemini API and return formatted JSON when valid input is provided', async () => {
        const mockGeminiResponse = {
            hero: {
                headline: "Test Headline",
                subheadline: "Test Subheadline",
                ctaText: "Click Here"
            },
            features: [],
            pricing: { price: 99, currency: "USD" }
        };

        mockGenerateContent.mockResolvedValueOnce({
            text: JSON.stringify(mockGeminiResponse)
        });

        const req = new NextRequest('http://localhost:3000/api/generate', {
            method: 'POST',
            body: JSON.stringify({ description: 'A test course' }),
        });

        const res = await POST(req);
        expect(res.status).toBe(200);

        const json = await res.json();
        expect(json.hero.headline).toBe('Test Headline');
        expect(mockGenerateContent).toHaveBeenCalledTimes(1);

        // Verify prompt contains our description
        const callArgs = mockGenerateContent.mock.calls[0][0];
        expect(callArgs.contents).toContain('A test course');
    });

    it('should return 500 if Gemini API fails', async () => {
        mockGenerateContent.mockRejectedValueOnce(new Error('API Failure'));

        const req = new NextRequest('http://localhost:3000/api/generate', {
            method: 'POST',
            body: JSON.stringify({ description: 'A test course' }),
        });

        const res = await POST(req);
        expect(res.status).toBe(500);
    });
});
