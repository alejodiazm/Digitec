import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const contentType = request.headers.get("content-type");

    if (contentType !== "application/csp-report") {
        return NextResponse.json(
            { error: "Invalid Content-Type" },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const report = body["csp-report"];

        // In a real production environment, send this to Sentry, Datadog, or similar.
        // For now, we log to stdout so it can be viewed in Vercel/Hostinger logs.
        console.warn("CSP Violation Report:", JSON.stringify(report, null, 2));

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to parse report" },
            { status: 400 }
        );
    }
}
