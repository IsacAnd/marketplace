"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  createProduct,
  deleteProduct,
  getAllProductsByUser,
} from "@/services/productService";
import { Product, ProductResponse, User } from "@/types/types";
import avatar from "@/../../public/avatar.webp";
import { IoMdAddCircle } from "react-icons/io";
import { FaTrash, FaEdit } from "react-icons/fa";
import defaultImage from "@/../../public/default-image.webp";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";

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
    image: null as File | null,
  });
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return router.push("/login");

    setUser(JSON.parse(storedUser));

    const fetchUserProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) return router.push("/login");

      try {
        const resp = await getAllProductsByUser(token);
        if (resp) {
          setProducts(resp);
        } else {
          setProducts([]);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [router]);

  const handleFormChange = (
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.value ||
      !formData.amount
    ) {
      return alert("Todos os campos devem ser preenchidos!");
    }

    const token = localStorage.getItem("token");
    if (!token) return router.push("/");

    const product: Product = {
      title: formData.title,
      description: formData.description,
      value: Number(formData.value),
      amount: Number(formData.amount),
    };

    try {
      const resp = await createProduct(
        product,
        token,
        formData.image ?? undefined
      );

      if (resp) {
        setProducts((prev) => [...prev, resp.product]);

        setIsModalOpen(false);
        setFormData({
          title: "",
          description: "",
          value: "",
          amount: "",
          image: null,
        });
        setPreview(null);
        toast.success("Produto adicionado com sucesso");
        router.push("/profile");
        return;
      }

      toast.success("Produto adicionado com sucesso");
      return;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar produto!");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) return router.push("/login");

    try {
      const resp = await deleteProduct(id, token);

      if (resp) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
        toast.success("Produto deletado com sucesso");
        return;
      }

      toast.error("Houve um erro ao deletar o produto!");
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

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
            sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
            priority
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
        <div className="flex justify-between mb-2">
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
                <div className="w-full h-40 relative rounded-lg overflow-hidden">
                  <Image
                    src={product.image ?? defaultImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-1">
                    {product.description}
                  </p>
                  <p className="text-blue-600 font-bold">R$ {product.value}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">
                      Quantidade: {product.amount}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/editProduct?id=${product._id}`)
                        }
                        className="rounded-full bg-green-300 p-3 text-white duration-300 hover:bg-green-400 cursor-pointer"
                        title="Editar produto"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id!)}
                        className="rounded-full bg-red-400 p-3 text-white duration-300 hover:bg-red-500 cursor-pointer"
                        title="Deletar produto"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
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
                    sizes="128px"
                    priority
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
                    onChange={handleFormChange}
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
            Salvar Produto
          </button>
        </form>
      </Modal>
    </div>
  );
}
