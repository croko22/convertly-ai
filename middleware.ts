import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/landings(.*)',
    '/trash(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();

    // Custom proxy logic for subdomains
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    const hostnameWithoutPort = hostname.split(":")[0];

    const rootDomains = [
        "localhost",
        "localhost.com",
        "127.0.0.1",
        "convertly.com",
        "www.convertly.com",
    ];

    const isVercelDomain = hostnameWithoutPort.endsWith(".vercel.app");

    if (!rootDomains.includes(hostnameWithoutPort) && !isVercelDomain) {
        const subdomain = hostnameWithoutPort
            .replace(".localhost.com", "")
            .replace(".localhost", "")
            .replace(".convertly.com", "");

        if (subdomain && subdomain !== "www") {
            const requestHeaders = new Headers(req.headers);
            requestHeaders.set("x-subdomain", subdomain);

            return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname === "/" ? "" : url.pathname}`, req.url), {
                request: {
                    headers: requestHeaders,
                },
            });
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
