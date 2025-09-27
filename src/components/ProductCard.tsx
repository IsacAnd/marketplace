"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";

import toast from "react-hot-toast";

interface CardProps {
  id: string | undefined;
  title: string;
  description: string;
  value: number;
  amount: number;
  image: string | StaticImageData;
}

export default function Card({
  id,
  title,
  description,
  value,
  amount,
  image,
}: CardProps) {
  const defaultImage = "/default-product.png";
  const router = useRouter();

  const addToCart = () => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    // verifica se já existe no carrinho
    const existing = cart.find(
      (item: { id: string | undefined }) => item.id === id
    );

    if (existing) {
      existing.amount += 1;
    } else {
      cart.push({ id, title, value, amount: 1, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Produto adicionado com sucesso!");
  };

  const goToProduct = () => {
    if (!id) return;
    router.push(`/productView/${id}`);
  };

  return (
    <div
      onClick={goToProduct}
      className="bg-white shadow-sm overflow-hidden flex flex-col 
                 transform transition-transform duration-300 
                 hover:scale-105 cursor-pointer"
    >
      <div className="w-full h-48 relative">
        <Image
          src={image || defaultImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
        <button
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center
                     bg-gray-200 rounded-full shadow-sm opacity-25 transition-colors duration-300
                     hover:opacity-80  
                     cursor-pointer"
          aria-label="Adicionar ao carrinho"
          onClick={(e) => {
            e.stopPropagation();
            addToCart();
          }}
        >
          <FaCartPlus className="text-gray-700" size={18} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="flex mt-auto justify-between items-end">
          <div>
            <p className="text-md font-bold">R$ {value.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Qtd: {amount}</p>
          </div>
          <button className="bg-green-400 px-4 py-2 rounded-lg cursor-pointer text-white font-bold hover:bg-green-500 transition-colors">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
