import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyTurnstileToken } from "@/lib/security/captcha";
import { validateEmailMx } from "@/lib/security/email-validation";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Define schema
const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
    _honey: z.string().optional(),
    token: z.string().min(1), // Turnstile token
});

// Create a basic in-memory rate limiter fallback if Redis is not configured
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const limit = 5;

    const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > windowMs) {
        record.count = 0;
        record.lastReset = now;
    }

    if (record.count >= limit) {
        return true;
    }

    record.count++;
    rateLimitMap.set(ip, record);
    return false;
}

export async function POST(request: Request) {
    try {
        // 1. IP Rate Limiting
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();

        // 2. Schema Validation
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid input", details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, message, _honey, token } = result.data;

        // 3. Honeypot Check
        if (_honey) {
            // Silent success for bots
            return NextResponse.json({ success: true });
        }

        // 4. CAPTCHA Verification
        const isCaptchaValid = await verifyTurnstileToken(token);
        if (!isCaptchaValid) {
            return NextResponse.json(
                { error: "CAPTCHA verification failed" },
                { status: 400 }
            );
        }

        // 5. MX Record Validation (Deep Email Check)
        const isMxValid = await validateEmailMx(email);
        if (!isMxValid) {
            return NextResponse.json(
                { error: "Invalid email domain. Cannot receive emails." },
                { status: 400 }
            );
        }

        // 6. Send Email (Mock for now, ready for Resend/SendGrid)
        console.log("SENDING EMAIL:", { name, email, message });

        // TODO: Integrate Resend logic here
        // await resend.emails.send({ ... })

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
