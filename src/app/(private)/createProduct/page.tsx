"use client";

import { useState } from "react";
import { createProduct } from "@/services/productService";
import { Product } from "@/types/types";

export default function CreateProductPage() {
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    amount: 0,
    value: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "amount" || name === "value" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Usuário não autenticado");
      setLoading(false);
      return;
    }

    try {
      const data = await createProduct(product, token, file ?? undefined);
      setMessage("Produto criado com sucesso!");
      setProduct({ title: "", description: "", amount: 0, value: 0 });
      setFile(null);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Criar Produto</h2>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Título do produto"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <div className="flex gap-4">
          <input
            type="number"
            name="amount"
            value={product.amount}
            onChange={handleChange}
            placeholder="Quantidade"
            className="border border-gray-300 rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="value"
            value={product.value}
            onChange={handleChange}
            placeholder="Valor (R$)"
            className="border border-gray-300 rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Produto"}
        </button>
        {message && <p className="text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
