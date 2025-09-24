import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="relative w-100%">
      <input
        type="text"
        placeholder="Pesquise por um produto específico"
        className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
