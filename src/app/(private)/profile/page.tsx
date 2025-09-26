"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProductsByUser } from "@/services/productService";
import { ProductResponse, User } from "@/types/types";
import avatar from "@/../../public/avatar.webp";
import { IoMdAddCircle } from "react-icons/io";
import Modal from "@/components/Modal"; // importe o modal

export default function Profile() {
  const [user, setUser] = useState<User>({
    token: "",
    completeName: "",
    email: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    amount: "",
  });
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return alert("Preencha todos os campos de texto!");
    }

    if (Number(formData.value) <= 0) {
      return alert("O valor deve ser maior que zero!");
    }

    if (Number(formData.amount) <= 0) {
      return alert("A quantidade deve ser maior que zero!");
    }

    console.log(formData);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 text-gray-800 px-6 md:px-12 lg:px-20 py-8 gap-8">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl p-6 gap-6 border-1 border-gray-200">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-1 ">
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
      <div>
        <div className="flex justify-between">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Seus Produtos
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center bg-green-400 px-5 text-lg text-bold text-white cursor-pointer rounded-full gap-2 duration-300 hover:bg-green-500"
          >
            Adicionar produto
            <span>
              <IoMdAddCircle size={22} />
            </span>
          </button>
        </div>
        {products.length === 0 ? (
          <p className="text-gray-500">Você ainda não postou nenhum produto.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col gap-3"
              >
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Adicionar Produto
        </h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Nome do produto
            </label>
            <input
              type="text"
              name="title"
              placeholder="Ex: Camisa Nike"
              value={formData.title}
              onChange={handleFormChange}
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
              placeholder="Digite a descrição..."
              value={formData.description}
              onChange={handleFormChange}
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
                placeholder="R$ 0,00"
                min={1}
                step={1}
                value={formData.value}
                onChange={handleFormChange}
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
                placeholder="0"
                min={1}
                step={1}
                value={formData.amount}
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-[1.02] cursor-pointer"
          >
            Salvar Produto
          </button>
        </form>
      </Modal>
    </div>
  );
}
