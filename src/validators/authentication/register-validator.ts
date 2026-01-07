// schemas/registerSchema.ts
import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "El nombre es requerido y debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(5, "Teléfono es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    password_confirmation: z.string().min(6, "La contraseña de confirmación es requerida"),
    criminalFile: z
        .instanceof(File)
        .refine(file => file.type === "application/pdf", "Solo se permite PDF")
        .optional(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
});

// Tipado para React Hook Form
export type RegisterFormValues = z.infer<typeof registerSchema>;
