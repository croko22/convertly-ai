# Delete & Trashcan Feature Design

## Overview
This document outlines the design for the "delete landing page" feature with a 30-day trashcan.

## Selected Approach: Soft-Delete with a Vercel Cron Job

### 1. Database Schema changes (`schema.prisma`)
- Add a `deletedAt` field of type `DateTime?` (nullable) to the `Course` model.
- *Reasoning: The Course is the root entity. Trashing the Course implies trashing the attached LandingPage and Lessons.*

### 2. UI & Route Changes
- **`/landings` Page Updates**:
  - Filter out essentially deleted records (ensure we only query for `Course` where `deletedAt` is `null`).
  - Add a "Trash" action to the dropdown menu of landing page cards.
  - Clicking Trash sets the `deletedAt` timestamp to `now()`.
  - Add a "View Trash" navigation link/button at the top of the page.
  
- **New `/trash` Page**:
  - Add a new page at `/trash` displaying cards for deleted items.
  - Query for pages where `Course.deletedAt` is NOT `null`.
  - Display deletion status (e.g., "Deleted X days ago").
  - Provide two actions per card:
    - **Restore**: Clears the `deletedAt` field (sets it back to `null`).
    - **Delete Permanently**: Performs a hard delete on the `Course` (and cascading deletes).

### 3. Automated Cleanup (Vercel Cron)
- Create a new API route `app/api/cron/cleanup-trash/route.ts`.
- This route will:
  - Verify an authorization secret (to ensure it was triggered by Vercel Cron).
  - Query and delete all `Course` records where `deletedAt` is older than 30 days.
- Add `vercel.json` to the root directory to define a daily cron job triggering the `/api/cron/cleanup-trash` endpoint.

## Future Considerations
- If trash items pile up heavily, we can optimize the cron job to process deletions in batches.
- We might want to empty the trash manually via an "Empty Trash" button on the UI in the future.
