"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProductsByUser, updateProduct } from "@/services/productService";
import { ProductResponse, Product } from "@/types/types";

import toast from "react-hot-toast";

interface FormData {
  title: string;
  description: string;
  value: string;
  amount: string;
  image: File | null;
}

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    value: "",
    amount: "",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return router.push("/profile");

    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const products: ProductResponse[] = await getAllProductsByUser(token);
      const product = products.find((p) => p._id === productId);
      if (!product) return router.push("/profile");

      setFormData({
        title: product.title,
        description: product.description,
        value: String(product.value),
        amount: String(product.amount),
        image: null,
      });
      setPreview(product.image ?? null);
    };

    fetchProduct();
  }, [productId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const updatedProduct: Product = {
      title: formData.title,
      description: formData.description,
      value: Number(formData.value),
      amount: Number(formData.amount),
    };

    try {
      const resp = await updateProduct(
        productId,
        updatedProduct,
        token,
        formData.image ?? undefined
      );
      if (resp) {
        toast.success("Produto editado com sucesso!");
        router.push("/profile");
      } else {
        toast.error("Erro ao editar o produto");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar o produto");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 px-6 md:px-12 lg:px-20 py-8 gap-8 text-black">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Editar Produto
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Nome do produto
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Descrição do produto
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label className="text-sm font-medium text-gray-700">Valor</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              min={1}
              step={1}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label className="text-sm font-medium text-gray-700">
              Quantidade disponível
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min={1}
              step={1}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Imagem do produto (opcional)
          </label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-green-400 transition">
            {preview ? (
              <div className="relative w-32 h-32">
                <Image
                  src={preview}
                  alt="Preview da imagem"
                  fill
                  className="object-cover rounded-lg"
                  sizes="100vw"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, image: null });
                    setPreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="text-gray-500 text-sm text-center cursor-pointer"
                >
                  Clique para selecionar uma imagem
                </label>
              </>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-[1.02] cursor-pointer"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
