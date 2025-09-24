"use client";

import { FormEvent, useState } from "react";
import { login } from "@/services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      const response = await login(email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-center items-center px-4">
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
              id="terms"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Lembrar-me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition cursor-pointer"
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
  );
}
