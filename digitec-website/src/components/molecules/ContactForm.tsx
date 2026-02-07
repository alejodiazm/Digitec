"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Turnstile from "react-turnstile";
import { Button } from "@/components/atoms/Button";
import { CONTACT_FORM } from "@/constants";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Ingresa un correo electrónico válido"),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
    _honey: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
    className?: string;
}

export const ContactForm = ({ className }: ContactFormProps) => {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [token, setToken] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData & { _honey?: string }) => {
        if (data._honey) return;

        if (!token) {
            alert("Por favor completa el CAPTCHA");
            return;
        }

        setStatus("submitting");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, token }),
            });

            if (!response.ok) throw new Error("Failed to send");

            setStatus("success");
            reset();
            setToken(null);
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const inputClasses = "w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-[#1E293B] focus:ring-0 rounded-none font-medium";

    return (
        <motion.div
            className={cn("bg-white p-8 rounded-2xl border border-black/5 shadow-xl shadow-black/[0.02]", className)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-[#475569] block">
                        {CONTACT_FORM.fields.name}
                    </label>
                    <input
                        {...register("name")}
                        id="name"
                        className={inputClasses}
                        placeholder="Tu nombre"
                    />
                    <AnimatePresence>
                        {errors.name && (
                            <motion.p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                                <AlertCircle className="w-4 h-4" /> {errors.name.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-[#475569] block">
                        {CONTACT_FORM.fields.email}
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className={inputClasses}
                        placeholder="tu@email.com"
                    />
                    <AnimatePresence>
                        {errors.email && (
                            <motion.p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                                <AlertCircle className="w-4 h-4" /> {errors.email.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-[#475569] block">
                        {CONTACT_FORM.fields.message}
                    </label>
                    <textarea
                        {...register("message")}
                        id="message"
                        rows={3}
                        className={`${inputClasses} resize-none`}
                        placeholder="¿Cómo podemos ayudarte?"
                    />
                    <AnimatePresence>
                        {errors.message && (
                            <motion.p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                                <AlertCircle className="w-4 h-4" /> {errors.message.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <input type="text" {...register("_honey")} className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="pt-2">
                    <div className="mb-4 flex justify-start">
                        <Turnstile
                            sitekey={env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
                            onVerify={(token) => setToken(token)}
                            onExpire={() => setToken(null)}
                            theme="light"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20"
                        size="lg"
                        isLoading={status === "submitting"}
                    >
                        {status === "success" ? "Enviado con éxito" : "Enviar Mensaje"}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};
