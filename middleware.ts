import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname (e.g. 'page-test.localhost:3000')
    const hostname = req.headers.get("host") || "";

    // Remove port if present
    const hostnameWithoutPort = hostname.split(":")[0];

    // Define domains that shouldn't be treated as subdomains
    const rootDomains = [
        "localhost",
        "localhost.com",
        "127.0.0.1",
        "convertly.com",
        "www.convertly.com",
    ];

    // Not a root domain? It's a subdomain.
    if (!rootDomains.includes(hostnameWithoutPort)) {
        // Extract the subdomain (e.g., 'page-name' from 'page-name.localhost.com')
        const subdomain = hostnameWithoutPort
            .replace(".localhost.com", "")
            .replace(".localhost", "")
            .replace(".convertly.com", "");

        // Only rewrite if we actually have a subdomain and it's not 'www'
        if (subdomain && subdomain !== "www") {
            // We rewrite the URL to `/[subdomain]${path}`
            // E.g., `page-name.localhost.com/` -> `/[slug]`
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
}
