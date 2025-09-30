"use client";

import { FormEvent, useState } from "react";
import { login as loginService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { loginSchema } from "@/schemas/loginSchema";

import Image from "next/image";
import uxstoreTemplate from "@/../../public/uxstoretemplate.png";
import uxstoreLogo from "@/../../public/uxstore-logo2.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginSchema.parse({ email, password });
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
      const response = await loginService(email, password);

      if (!response || !response.token) {
        toast.error(response?.message || "Erro ao fazer login");
        return;
      }

      const userData: User = {
        token: response.token,
        completeName: response.user.completeName,
        email: response.user.email,
      };

      login(userData.token, userData);
      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao fazer login";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-evenly items-center px-4">
      <div className="flex w-1/2 border-r-3 justify-center">
        <Image src={uxstoreTemplate} alt="UX Store Logo" width={700} />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Image src={uxstoreLogo} alt="UX Store Logo" width={100} />
        <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h2 className="text-center text-2xl font-bold text-gray-700">
              Login
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-600">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="exemplo@email.com"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-gray-600">
                Senha
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Lembrar-me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-400 text-white font-semibold py-2.5 rounded-lg hover:bg-green-500 transition cursor-pointer"
            >
              Entrar
            </button>
            <p className="text-center text-sm text-gray-500">
              Não possui conta?{" "}
              <a
                href="/register"
                className="text-blue-500 font-medium hover:underline"
              >
                Cadastre-se
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
