'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RegisterFormValues, registerSchema } from '@/validators/authentication/register-validator';

type Role = 'client' | 'specialist';

interface RegisterFormProps {
    role: Role;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ role }) => {
    const router = useRouter();

    const [form, setForm] = useState<RegisterFormValues>({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        criminalFile: undefined,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'criminalFile' && files) {
            setForm({ ...form, criminalFile: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const parseResult = registerSchema.safeParse(form);

        setErrors({});

        if (!parseResult.success) {
            const newErrors: Partial<Record<keyof RegisterFormValues, string>> = {};
            parseResult.error.issues.forEach(issue => {
                const path = issue.path[0] as keyof RegisterFormValues;
                newErrors[path] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        if (role === 'specialist' && !form.criminalFile) {
            setErrors({ criminalFile: 'Archivo es requerido' });
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('password', form.password);
        formData.append('password_confirmation', form.password_confirmation);
        formData.append('role', role);

        if (role === 'specialist' && form.criminalFile) {
            formData.append('criminal_record_file', form.criminalFile);
        }

        console.log('Enviando:', formData);
        alert('Registro enviado!');
        router.push('/');
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 capitalize">Registro {role}</h2>

            {/* Nombre */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Password Confirmation */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Confirmar Contraseña</label>
                <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
            </div>

            {/* Criminal File solo para specialists */}
            {role === 'specialist' && (

                // <div className="mb-4">
                //     <label className="block text-black mb-1">Archivo de antecedentes (PDF)</label>

                //     {errors.criminalFile && <p className="text-red-500 text-sm mt-1">{errors.criminalFile}</p>}
                // </div>
                <div className="w-full max-w-md mx-auto my-5">
                    <label
                        htmlFor="criminalFile"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl bg-blue-50 border-blue-200 text-gray-800 cursor-pointer hover:bg-blue-100 transition-colors shadow-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 mb-3 text-blue-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"
                            />
                        </svg>

                        <span className="font-semibold text-lg text-gray-800">Sube tu archivo PDF</span>
                        <span className="text-gray-500 text-sm mt-1">Arrastra o haz click para seleccionar</span>
                    </label>
                    <input
                        id="criminalFile"
                        type="file"
                        name="criminalFile"
                        accept=".pdf"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>

            )}

            <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
                Registrarse
            </button>
        </motion.form>
    );
};
