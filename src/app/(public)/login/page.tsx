export default function Login() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center ">
      <div
        className="w-full max-w-sm flex flex-col gap-4 rounded-lg p-8 text-gray-700 backdrop-blur-sm hover:shadow-lg"
        style={{ boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.05)" }}
      >
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-600">
          Login
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
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
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
          />
          <label htmlFor="terms" className="text-sm">
            Aceito os termos
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold p-3 rounded-lg cursor-pointer hover:bg-blue-400 transform transition-all duration-300"
        >
          Entrar
        </button>

        {/* Link de registro */}
        <a
          href="/register"
          className="text-center text-blue-500 hover:underline mt-2 text-sm"
        >
          Não possuo uma conta
        </a>
      </div>
    </div>
  );
}
