// app/login/page.tsx
"use client";

import { loginSchema } from "@/validators/authentication/login-validator";
import { useState } from "react";

type FormData = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const [form, setForm] = useState<FormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = loginSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors: Partial<FormData> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FormData;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        try {
            console.log("Login OK:", result.data);
            // llamada al backend aquí
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Iniciar sesión
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Accede a tu cuenta
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="correo@ejemplo.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-blue-400 text-white font-medium hover:bg-blue-500 transition disabled:opacity-50"
                    >
                        {loading ? "Ingresando..." : "Entrar"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Regístrate
                    </a>
                </div>
            </div>
        </div>
    );
}
