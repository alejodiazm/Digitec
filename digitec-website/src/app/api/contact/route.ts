import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { verifyTurnstileToken } from "@/lib/security/captcha";
import { validateEmailMx } from "@/lib/security/email-validation";
import { env } from "@/lib/env";

// Define schema
const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
    _honey: z.string().optional(),
    token: z.string().min(1), // Turnstile token
});

// In-memory rate limiter (5 envíos por IP por hora)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hora
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

const resend = new Resend(env.RESEND_API_KEY);

const COMPANY_EMAIL = "digitecglobalsas@gmail.com";
const COMPANY_NAME = "DIGITEC GLOBAL SAS";

export async function POST(request: Request) {
    try {
        // 1. IP Rate Limiting
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
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

        // 6. Send notification email to DIGITEC team
        const { error: notifyError } = await resend.emails.send({
            from: `Formulario Web <noreply@digitec.global>`,
            to: COMPANY_EMAIL,
            replyTo: email,
            subject: `📬 Nuevo mensaje de ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F8FAFC; border-radius: 12px;">
                    <h2 style="color: #1E293B; border-bottom: 2px solid #3B82F6; padding-bottom: 12px;">
                        Nuevo mensaje desde el formulario web
                    </h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Nombre:</td>
                            <td style="padding: 8px 0; color: #1E293B;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                            <td style="padding: 8px 0; color: #1E293B;">
                                <a href="mailto:${email}" style="color: #3B82F6;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Mensaje:</td>
                            <td style="padding: 8px 0; color: #1E293B; white-space: pre-wrap;">${message}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 24px; padding: 16px; background: #EFF6FF; border-radius: 8px; border-left: 4px solid #3B82F6;">
                        <p style="margin: 0; font-size: 14px; color: #475569;">
                            💡 Puedes responder directamente a este email para contactar a <strong>${name}</strong>.
                        </p>
                    </div>
                    <p style="font-size: 12px; color: #94A3B8; margin-top: 24px; text-align: center;">
                        ${COMPANY_NAME} — digitec.global
                    </p>
                </div>
            `,
        });

        if (notifyError) {
            console.error("Error enviando email de notificación:", notifyError);
            // No retornamos error al usuario si el email de notificación falla
        }

        // 7. Send confirmation email to client
        await resend.emails.send({
            from: `${COMPANY_NAME} <noreply@digitec.global>`,
            to: email,
            subject: `✅ Recibimos tu mensaje, ${name.split(" ")[0]}!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F8FAFC; border-radius: 12px;">
                    <h2 style="color: #1E293B;">¡Hola, ${name.split(" ")[0]}! 👋</h2>
                    <p style="color: #475569; line-height: 1.6;">
                        Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y te responderemos
                        <strong style="color: #1E293B;">en menos de 24 horas</strong>.
                    </p>
                    <div style="margin: 24px 0; padding: 16px; background: #white; border: 1px solid #E2E8F0; border-radius: 8px;">
                        <p style="margin: 0; font-size: 14px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold;">Tu mensaje:</p>
                        <p style="margin: 8px 0 0; color: #475569; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #475569; line-height: 1.6;">
                        Mientras tanto, puedes escribirnos directamente por WhatsApp o seguirnos en nuestras redes sociales.
                    </p>
                    <div style="text-align: center; margin-top: 32px;">
                        <a href="https://wa.me/573028010431" style="display: inline-block; background: #3B82F6; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                            Escribir por WhatsApp
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #94A3B8; margin-top: 32px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
                        ${COMPANY_NAME} • Bogotá, Colombia • ${COMPANY_EMAIL}
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
