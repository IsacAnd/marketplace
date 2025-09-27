"use client";

import Card from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/productService";
import { ProductResponse } from "@/types/types";
import { useRouter } from "next/navigation";
import defaultImage from "@/../../public/default-image.webp";

export default function Home() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const resp = await getAllProducts(token);
        setProducts(resp);
      } catch (error) {
        throw error;
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 text-black px-6 md:px-12 lg:px-20 py-8 gap-8">
      <SearchBar />

      <h1 className="text-xl md:text-2xl font-bold">Produtos disponíveis</h1>

      {products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {products.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              title={product.title}
              description={product.description}
              value={product.value}
              amount={product.amount}
              image={product.image ?? defaultImage}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full justify-center border border-gray-300 p-4 rounded-lg">
          <h1>Sem produtos a serem exibidos! Seja o primeiro a postar :D</h1>
        </div>
      )}
    </div>
  );
}
