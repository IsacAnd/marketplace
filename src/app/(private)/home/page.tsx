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

      const resp = await getAllProducts(token);
      setProducts(resp);
      console.log(resp);
    };

    fetchProducts();
  }, [router]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 text-black px-6 md:px-12 lg:px-20 py-8 gap-8">
      <SearchBar />

      <h1 className="text-xl md:text-3xl font-bold">Produtos</h1>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {products.map((product) => (
          <Card
            key={product._id}
            title={product.title}
            description={product.description}
            value={product.value}
            amount={product.amount}
            image={product.image ?? defaultImage}
          />
        ))}
      </div>
    </div>
  );
}
