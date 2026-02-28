# Auth with Clerk

## Overview
Integrate Clerk Authentication into the Next.js app to protect routes and tie generated pages to a specific user. 

## Approach
Clerk Next.js SDK providing drop-in authentication.

### 1. Installation
Install `@clerk/nextjs`.

### 2. Database Schema
- **File**: `schema.prisma`
- **Changes**: Add `userId String?` to the `Course` model to map generation back to the logged in user. Make optional initially so existing records don't crash.

### 3. Application Setup
- **File**: `app/layout.tsx`
- **Changes**: Wrap the entire application in `<ClerkProvider>`. Also ensure our `html` and `body` tags are correctly positioned.
- **File**: `middleware.ts` 
- **Changes**: Add `clerkMiddleware()` configuring public and private routes. Make `/landings` and `/trash` protected routes.

### 4. UI Adjustments
- **File**: `components/header.tsx`
- **Changes**: Integrate `<SignedIn>`, `<SignedOut>`, `<UserButton>`, and `<SignInButton>`. Hide "Get Started" if signed in, replacing it with the User Avatar.

### 5. API / Actions
- **File**: `app/actions/landing.ts` (and relevant creation endpoints)
- **Changes**: 
  - Retrieve the current user ID using `auth().userId` out of `@clerk/nextjs/server`. 
  - Ensure the generation logic assigns `userId: currentUser` when creating a new `Course`.
  - Update any data fetching to filter `Course` by `userId`.
