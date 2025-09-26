"use client";

import { ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95 animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-sm transition cursor-pointer"
        >
          <IoMdClose size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}
