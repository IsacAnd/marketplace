import { Product } from "@/types/types";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;

export async function createProduct(
  product: Product,
  token: string,
  file?: File
) {
  if (!token) throw new Error("You must pass the token!");

  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("amount", String(product.amount));
  formData.append("value", String(product.value));

  if (file) {
    formData.append("image", file);
  }

  try {
    const response = await fetch(`${API_URL}/api/products/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Houve um erro na requisição");

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const getAllProducts = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Houve um erro na requisição");

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Produto não encontrado");

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const editProduct = async (
  id: string,
  product: Product,
  token: string,
  file?: File
) => {
  if (!token) throw new Error("You must pass the token!");

  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("amount", String(product.amount));
  formData.append("value", String(product.value));

  if (file) {
    formData.append("image", file);
  }

  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Não colocar Content-Type com FormData
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Erro ao editar produto");

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao excluir produto");

    return response.json();
  } catch (error) {
    throw error;
  }
};
