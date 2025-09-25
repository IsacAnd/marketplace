"use client";
import Image from "next/image";
import uxstoreLogo from "@/../../public/uxstore-logo2.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full h-20 shadow-lg bg-gray-50 text-black flex items-center justify-between px-20 border-b border-gray-200">
      <Image src={uxstoreLogo} alt="UX Store Logo" width={70} />

      <ul className="flex gap-10 text-gray-600">
        <li className="cursor-pointer hover:text-green-500 transition-colors">
          <Link href="/home">
            <RiHome2Fill size={21} />
          </Link>
        </li>
        <li className="cursor-pointer hover:text-green-500 transition-colors">
          <Link href="/profile">
            <FaUser size={18} />
          </Link>
        </li>
        <li className="cursor-pointer hover:text-green-500 transition-colors">
          <Link href="/cart">
            <FaShoppingCart size={20} />
          </Link>
        </li>
        <li className="cursor-pointer hover:text-green-500 transition-colors">
          <Link href="/logout" onClick={handleLogout}>
            <IoLogOut size={20} />
          </Link>
        </li>
      </ul>
    </header>
  );
}
