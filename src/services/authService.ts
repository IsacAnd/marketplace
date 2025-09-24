import { AuthResponse, UserRegister } from "@/types/types";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, init);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function register(user: UserRegister): Promise<AuthResponse> {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, init);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
