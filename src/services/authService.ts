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

  const response = await fetch(`${API_URL}/api/auth/login`, init);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || data.message || `Erro HTTP: ${response.status}`
    );
  }

  return data;
}

export async function register(user: UserRegister): Promise<AuthResponse> {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${API_URL}/api/auth/register`, init);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Erro HTTP: ${response.status}`);
  }

  return data;
}
