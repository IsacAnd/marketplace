"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/services/authService";
import { User, UserRegister } from "@/types/types";

import { IMaskInput } from "react-imask";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { registerSchema } from "@/schemas/registerSchema";

export default function Register() {
  const [user, setUser] = useState<UserRegister>({
    cpf: "",
    completeName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      registerSchema.parse({ ...user, confirmPassword });
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const firstError = err.flatten().fieldErrors;
        const firstMessage =
          (Object.values(firstError).flat()[0] as string) ||
          "Erro no formulário";
        toast.error(firstMessage);
      } else {
        toast.error("Erro desconhecido no formulário");
      }
      return;
    }

    try {
      const userToSend = {
        ...user,
        cpf: user.cpf.replace(/\D/g, ""),
        phone: user.phone.replace(/\D/g, ""),
      };

      const response = await register(userToSend);

      if (!response || !response.token) {
        toast.error(response?.message || "Erro ao cadastrar usuário");
      }

      const userData: User = {
        token: response.token,
        completeName: response.user.completeName,
        email: response.user.email,
      };

      login(userData.token, userData);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao cadastrar usuário";
      toast.error(message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-center text-2xl font-bold text-gray-700">
            Cadastro
          </h2>

          {/* CPF */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cpf" className="font-medium text-gray-600">
              CPF
            </label>
            <IMaskInput
              mask="000.000.000-00"
              value={user.cpf}
              onAccept={(value: string) => setUser({ ...user, cpf: value })}
              placeholder="000.000.000-00"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          {/* Nome completo */}
          <div className="flex flex-col gap-1">
            <label htmlFor="completeName" className="font-medium text-gray-600">
              Nome completo
            </label>
            <input
              type="text"
              name="completeName"
              value={user.completeName}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-medium text-gray-600">
              Telefone
            </label>
            <IMaskInput
              mask="(00) 00000-0000"
              value={user.phone}
              onAccept={(value: string) => setUser({ ...user, phone: value })}
              placeholder="(00) 00000-0000"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium text-gray-600">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Confirma senha */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="font-medium text-gray-600"
            >
              Confirme sua senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite novamente sua senha"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-gray-500">
            Já possui conta?{" "}
            <a
              href="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Entre aqui
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
