export default function Card() {
  return (
    <div className="flex flex-col h-90 rounded-2xl">
      <div className="flex-10 bg-black">foto</div>
      <div className="flex flex-col flex-4 bg-blue px-1">
        <h3>Título do produto</h3>
        <span>Descrição</span>
        <div className="flex-1 flex items-end justify-end">
          <h2 className="text-lg font-bold">R$1000,00</h2>
        </div>
      </div>
    </div>
  );
}
