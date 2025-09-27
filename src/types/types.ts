export interface UserRegister {
  cpf: string;
  completeName: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  token: string;
  completeName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    completeName: string;
  };
  message?: string;
}

export interface Product {
  title: string;
  description: string;
  value: number;
  amount: number;
}

export interface ProductResponse extends Product {
  _id?: string;
  image?: string;
}
