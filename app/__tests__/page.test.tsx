import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('Home Page - Landing Generator Form', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock the global fetch
        global.fetch = vi.fn();
    });

    it('renders the form correctly', () => {
        render(<Home />);

        expect(screen.getByText('Generate Landing Page')).toBeInTheDocument();
        expect(screen.getByLabelText(/Source URL/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    });

    it('shows validation error if neither URL nor description is provided', async () => {
        render(<Home />);

        // Attempt submitting the empty form directly
        const submitBtn = screen.getByRole('button', { name: /Generate Magic/i });
        fireEvent.click(submitBtn);

        // React Hook Form handles this async
        await waitFor(() => {
            expect(screen.getByText('You must provide either a YouTube URL or a description.')).toBeInTheDocument();
        });

        // Ensure fetch was not called
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('submits form successfully when description is provided', async () => {
        // Mock successful generate API
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                hero: { headline: "Mocked AI Output" }
            })
        });

        // Mock successful landing API
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                slug: "mocked-ai-output"
            })
        });

        render(<Home />);

        const descInput = screen.getByLabelText(/Description/i);
        fireEvent.change(descInput, { target: { value: 'A cool test course' } });

        const submitBtn = screen.getByRole('button', { name: /Generate Magic/i });
        fireEvent.click(submitBtn);

        // The button state should morph to Generating...
        expect(screen.getByRole('button', { name: /Generating/i })).toBeInTheDocument();

        await waitFor(() => {
            // 1 call to generate, 1 call to landing
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });

        // Verify correct endpoints were queried
        expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe('/api/generate');
        expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls[1][0]).toBe('/api/landing');

        // Currently useRouter isn't wired sequentially in onSubmit, so we can't test mockPush reliably
        // without confirming it's un-commented in page.tsx. Our focus is ensuring the form triggers fetch.
    });
});
