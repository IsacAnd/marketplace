"use client";

import { User, UserRegister } from "@/types/types";
import { FormEvent, useState } from "react";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user.password !== confirmPassword) {
        alert("Senhas não correspondem!");
        return;
      }

      const response = await register(user);

      if (!response || !response.token) {
        return Error("Something goes wrong!");
      }

      const userData: User = {
        token: response.token,
        completeName: response.user.completeName,
        email: response.user.email,
      };

      login(userData.token, userData);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-center text-2xl font-bold text-gray-700">
            Cadastro
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="cpf" className="font-medium text-gray-600">
              CPF
            </label>
            <input
              onChange={handleChange}
              value={user.cpf}
              type="text"
              name="cpf"
              id="cpf"
              placeholder="000.000.000-00"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="completeName" className="font-medium text-gray-600">
              Nome completo
            </label>
            <input
              onChange={handleChange}
              value={user.completeName}
              type="text"
              name="completeName"
              id="completeName"
              placeholder="Digite seu nome completo"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={handleChange}
              value={user.email}
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-medium text-gray-600">
              Telefone
            </label>
            <input
              onChange={handleChange}
              value={user.phone}
              type="tel"
              name="phone"
              id="phone"
              placeholder="(00) 00000-0000"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium text-gray-600">
              Senha
            </label>
            <input
              onChange={handleChange}
              value={user.password}
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="font-medium text-gray-600"
            >
              Confirme sua senha
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              id="confirmPassword"
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
