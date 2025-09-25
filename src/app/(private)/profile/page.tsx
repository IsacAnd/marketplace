"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getAllProducts,
  getAllProductsByUser,
} from "@/services/productService";
import { Product, ProductResponse, User } from "@/types/types";
import avatar from "@/../../public/avatar.webp";

export default function Profile() {
  const [user, setUser] = useState<User>({
    token: "",
    completeName: "",
    email: "",
  });
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return router.push("/login");

    setUser(JSON.parse(storedUser));

    const fetchUserProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) return router.push("/login");

      const resp = await getAllProductsByUser(token);
      setProducts(resp);
    };

    fetchUserProducts();
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 text-gray-800 px-6 md:px-12 lg:px-20 py-8 gap-8">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-6 gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-4 border-blue-500">
          <Image
            src={avatar}
            alt="User avatar"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {user.completeName}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Produtos do Usuário */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Seus Produtos
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">Você ainda não postou nenhum produto.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col gap-3"
              >
                {/* Imagem */}
                {product.image && (
                  <div className="w-full h-40 relative rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Informações */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-blue-600 font-bold">
                    R$ {product.value.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantidade: {product.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
