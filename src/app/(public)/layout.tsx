"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // usuário logado não deve acessar páginas públicas
      router.replace("/home");
    }
  }, [user, router]);

  // enquanto verifica o user, evita renderizar conteúdo público
  if (user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Redirecionando...</p>
      </div>
    );
  }

  return <>{children}</>;
}
