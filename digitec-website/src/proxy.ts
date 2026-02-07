import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = new Map();

// CAMBIO CLAVE: Se renombró de 'middleware' a 'proxy'
export function proxy(request: NextRequest) {
    const response = NextResponse.next();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    // Tu lógica de Rate Limiting
    const now = Date.now();
    const windowMs = 60 * 1000;

    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, startTime: now });
    } else {
        const data = rateLimit.get(ip);
        if (now - data.startTime > windowMs) {
            rateLimit.set(ip, { count: 1, startTime: now });
        } else {
            data.count++;
            if (data.count > 100) {
                return new NextResponse("Too Many Requests", { status: 429 });
            }
        }
    }

    // Tu lógica de Security Headers (CSP)
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self' data:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        frame-src https://challenges.cloudflare.com;
        upgrade-insecure-requests;
    `;

    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, " ")
        .trim();

    response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
    response.headers.set("X-DNS-Prefetch-Control", "on");
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};