"use client";

import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  value: number;
  amount: number;
  image?: string;
}

export default function Card({
  title,
  description,
  value,
  amount,
  image,
}: CardProps) {
  // Imagem padrão (coloque em public/default-product.png)
  const defaultImage = "/default-product.png";

  return (
    <div className="bg-white rounded-t-2xl shadow-md overflow-hidden flex flex-col">
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

        {/* Botão sobreposto */}
        <button
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center 
                     bg-gray-200 bg-opacity-70 rounded-full shadow-md
                     hover:bg-gray-300 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     cursor-pointer"
          aria-label="Adicionar ao carrinho"
        >
          <FaCartPlus className="text-gray-700" size={18} />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Descrição */}
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* Preço + botão comprar */}
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
