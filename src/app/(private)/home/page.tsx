import Card from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col w-100% h-100% bg-gray-50 text-black px-20 py-15 gap-10">
      <SearchBar />

      <h1 className="text-xl font-bold">Produtos</h1>
      <div className="w-100% h-100% grid grid-cols-5 gap-5">
        <Card />
      </div>
    </div>
  );
}
