"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import toast from "react-hot-toast";

type CartItem = {
  id: string;
  title: string;
  value: number;
  amount: number;
  image?: string;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const increaseAmount = (id: string) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decreaseAmount = (id: string) => {
    updateCart(
      cart
        .map((item) =>
          item.id === id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        )
        .filter((item) => item.amount > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.value * item.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 px-6 md:px-12 lg:px-20 py-10 gap-8">
      {/* Header */}
      <div className="flex items-center gap-3 text-2xl font-bold">
        <FaShoppingCart className="w-7 h-7 text-blue-500" />
        <h1>Carrinho de Compras</h1>
      </div>

      {/* Lista de produtos */}
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Seu carrinho está vazio.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white rounded-xl shadow-md p-4"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">R$ {item.value.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseAmount(item.id)}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className="font-medium">{item.amount}</span>
                  <button
                    onClick={() => increaseAmount(item.id)}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Resumo */}
      {cart.length > 0 && (
        <div className="mt-auto bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-blue-600">R$ {total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
