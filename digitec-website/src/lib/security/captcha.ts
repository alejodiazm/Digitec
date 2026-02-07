import { env } from "@/lib/env";

interface TurnstileVerifyResponse {
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
    const endpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const secret = env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data: TurnstileVerifyResponse = await response.json();
        return data.success;
    } catch (error) {
        console.error("Turnstile verification error:", error);
        return false;
    }
}
