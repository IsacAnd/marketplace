export default function Register() {
  return (
    <div className="w-screen h-screen h-max bg-gray-100 flex justify-center items-center ">
      <div
        className="w-full max-w-sm flex flex-col gap-3 rounded-lg px-8 py-4 text-gray-700 backdrop-blur-sm hover:shadow-lg"
        style={{ boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.05)" }}
      >
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-600">
          Cadastro
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="cpf" className="font-medium">
            Cpf
          </label>
          <input
            type="number"
            name="cpf"
            id="cpf"
            placeholder="000.000.000-00"
            className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completeName" className="font-medium">
            Nome completo
          </label>
          <input
            type="text"
            name="completeName"
            id="completeName"
            placeholder="Digite seu nome completo aqui"
            className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email aqui"
            className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="font-medium">
            Telefone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="(00) 00000-0000"
            className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirme sua senha
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Digite novamente sua senha"
            className="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold p-3 rounded-lg cursor-pointer hover:bg-blue-400 transform transition-all duration-300"
        >
          Cadastrar
        </button>
        <a
          href="/login"
          className="text-center text-blue-500 hover:underline mt-2 text-sm"
        >
          Já possuo uma conta
        </a>
      </div>
    </div>
  );
}
