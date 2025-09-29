"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/services/productService";
import { ProductResponse } from "@/types/types";
import { FaCartPlus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductResponse | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const resp = await getProductById(id as string, token);
        setProduct(resp);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [router, id]);

  const addToCart = () => {
    if (!product) return;

    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const existing = cart.find(
      (item: { id: string }) => item.id === product._id
    );

    if (existing) {
      existing.amount += 1;
    } else {
      cart.push({
        id: product._id,
        title: product.title,
        value: product.value,
        amount: 1,
        image: product.image || "/default-image.webp",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Produto adicionado ao carrinho!");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <IoArrowBack size={20} />
        Voltar
      </button>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-lg">
        <div className="flex justify-center items-center">
          <Image
            src={product.image || "/default-image.webp"}
            alt={product.title}
            width={450}
            height={450}
            className="rounded-2xl object-cover shadow-sm"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xl font-semibold text-green-600 mb-2">
              R$ {product.value.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Disponível: {product.amount}
            </p>
            <button
              onClick={addToCart}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow transition-transform transform hover:scale-105"
            >
              <FaCartPlus size={20} />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
