type CardProps = {
  title: string;
  description: string;
  value: number;
  amount: number;
  image?: string;
};

export default function Card({
  title,
  description,
  value,
  amount,
  image,
}: CardProps) {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <span className="font-semibold">R$ {value}</span>
        <span>Quantidade: {amount}</span>
      </div>
    </div>
  );
}
