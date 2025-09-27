import { z } from "zod";

export const registerSchema = z
  .object({
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    completeName: z.string().min(3, "Nome completo inválido"),
    email: z.string().email("Email inválido"),
    phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof registerSchema>;
