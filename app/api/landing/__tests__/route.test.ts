import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { prismaMock } from '@/lib/prisma-mock';

// Import the POST handler
const { POST } = await import('../route');

describe('POST /api/landing', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if malformed body is provided', async () => {
        const req = new NextRequest('http://localhost:3000/api/landing', {
            method: 'POST',
            body: JSON.stringify({ invalid: 'data' }),
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toBe('Invalid landing page data');
    });

    it('should successfully save course and landing page to database via transaction', async () => {
        const mockPayload = {
            hero: {
                headline: "Test Headline Generator",
                subheadline: "Generating nice things",
                ctaText: "Buy"
            },
            features: [],
            pricing: {
                price: 199,
                currency: "USD"
            }
        };

        // Mock successful transaction that returns an array with the newly created course & landing page
        prismaMock.$transaction.mockResolvedValueOnce([
            { id: 'course-123', title: mockPayload.hero.headline },
            { id: 'landing-123', slug: 'test-headline-generator' }
        ]);

        const req = new NextRequest('http://localhost:3000/api/landing', {
            method: 'POST',
            body: JSON.stringify(mockPayload),
        });

        const res = await POST(req);
        expect(res.status).toBe(200);

        const json = await res.json();
        expect(json.message).toBe("Landing page created successfully!");
        expect(json.courseId).toBe('course-123');
        expect(json.slug).toBe('test-headline-generator');

        // Verify Prisma was called correctly
        expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);

        // Check the slug generation within the mocked transaction array
        // (We can't easily assert the deeply nested Prisma query objects injected into transaction
        // unless we spy on prismaMock.course.create, but inside transaction it uses the tx client.
        // However, vitest-mock-extended handles this elegantly).
    });

    it('should return 500 if database transaction fails', async () => {
        const mockPayload = {
            hero: { headline: "Errors", subheadline: "Are fun", ctaText: "Fail" },
            features: [],
            pricing: { price: 0, currency: "USD" }
        };

        prismaMock.$transaction.mockRejectedValueOnce(new Error('DB Error'));

        const req = new NextRequest('http://localhost:3000/api/landing', {
            method: 'POST',
            body: JSON.stringify(mockPayload),
        });

        const res = await POST(req);
        expect(res.status).toBe(500);
    });
});
