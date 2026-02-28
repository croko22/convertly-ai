# Design Doc: Edit Landing Form Improvements

**Date:** 2026-02-27
**Topic:** Side-by-Side Live Preview Editor

## Overview
The goal is to improve the "edit landing page" experience by maximizing screen real estate and providing a "real-time" WYSIWYG feel. The user explicitly requested a side-by-side split view with a live preview and inline slug editing.

## Architecture & Data Flow

1. **Shared Render Component (`LandingPageTemplate`)**
   - We will extract the exact JSX responsible for rendering a landing page from `app/[slug]/page.tsx`.
   - This new component (`components/landing-page-template.tsx`) will simply accept a `data` prop (type `CourseLandingPage`).
   - `app/[slug]/page.tsx` will fetch data from Prisma, and pass it to this template.

2. **Split Screen Edit Form (`EditLandingForm`)**
   - The form component will be updated to a CSS Grid structure (e.g., `grid-cols-1 lg:grid-cols-2`).
   - **Left Pane:** The existing `react-hook-form` inputs. We will make this lane independently scrollable (`overflow-y-auto`, `h-screen`).
   - **Right Pane:** The Live Preview. It will render the new `<LandingPageTemplate>` component.
   - **Data Pipe:** We will use `form.watch()` to pipe the current, hot form state directly into the `LandingPageTemplate`. As the user types in the left pane, the right pane updates instantly.

## Component Changes

### 1. `components/landing-page-template.tsx` [NEW]
- A dumb, presentational component.
- Props: `{ data: CourseLandingPage }`
- Contains the Hero, Features, About Creator, Testimonials, and Pricing sections.

### 2. `app/[slug]/page.tsx` [MODIFY]
- Removes the hardcoded JSX.
- Imports and renders `<LandingPageTemplate data={data} />`.

### 3. `components/edit-landing-form.tsx` [MODIFY]
- Wrap the return statement in a flex/grid split layout.
- Use `useWatch` or `form.watch` to get the latest form values.
- Right pane: `<LandingPageTemplate data={watchedData} />`.
- Left pane: Clean up padding/margins to fit perfectly in a half-width container.

## Slug Editing

### Requirements
- Provide an inline, editable text field at the very top of the Left Pane (e.g., `convertly.ai/ [ input field ]`).

### Data Flow
- We will add `slug` to the form state locally within `EditLandingForm` (since it's not strictly part of `CourseLandingPage` schema, we can pass it alongside).
- The Server Action `updateLandingPage` will be updated to accept `slug: string` as an optional third argument, or we'll wrap it in a new payload type.
- The server will update the `slug` in the `LandingPage` Prisma model securely.

## Success Criteria
- [ ] Users can edit landing page content and see the exact result updating in real-time.
- [ ] Users can edit the page slug directly from the edit form.
- [ ] The actual live page and the preview page share 100% the same code/styling.
