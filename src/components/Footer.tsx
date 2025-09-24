"use client";

import Image from "next/image";
import uxstoreLogo from "@/../../public/uxstore-logo3.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Image
            priority={true}
            src={uxstoreLogo}
            alt="UX Store Logo"
            width={100}
          />
          <span className="font-bold text-2xl">UX Store</span>
        </div>
        <ul className="flex gap-6 text-sm">
          <li className="hover:text-green-500 cursor-pointer transition-colors">
            Sobre Nós
          </li>
          <li className="hover:text-green-500 cursor-pointer transition-colors">
            Contato
          </li>
          <li className="hover:text-green-500 cursor-pointer transition-colors">
            Termos de Uso
          </li>
        </ul>
        <div className="flex gap-4 text-gray-700">
          <FaFacebookF className="hover:text-green-500 cursor-pointer transition-colors" />
          <FaInstagram className="hover:text-green-500 cursor-pointer transition-colors" />
          <FaTwitter className="hover:text-green-500 cursor-pointer transition-colors" />
        </div>
      </div>
      <div className="w-full border-t border-gray-200 mt-4 pt-2 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} UX Store. Todos os direitos reservados.
      </div>
    </footer>
  );
}
