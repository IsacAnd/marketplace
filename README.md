# 🛍️ UxStore

Projeto de e-commerce desenvolvido com **Next.js**, **React** e **TailwindCSS**, com foco em performance, escalabilidade e boas práticas de desenvolvimento.

## ✨ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) – Framework React para SSR, SSG e aplicações híbridas.
- [React](https://react.dev/) – Biblioteca para construção de interfaces.
- [TailwindCSS](https://tailwindcss.com/) – Framework CSS utilitário para estilização rápida e responsiva.
- [TypeScript](https://www.typescriptlang.org/) – Superset do JavaScript para maior segurança e escalabilidade.
- [Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch/) – Requisições HTTP para comunicação com o backend.
- [Context API / Hooks](https://react.dev/reference/react) – Gerenciamento de estado e autenticação.
- [Zod](https://zod.dev/) – Biblioteca de validação dos dados de formulário.

## ⚙️ Funcionalidades

- 🔐 Autenticação de usuários (login, registrol)
- 🛒 Gerenciamento de produtos (listagem, pesquisa, detalhes, adição, remoção e atualização)
- 👤 Perfil do usuário
- 📦 Carrinho de compras
- 🎨 Layout responsivo com TailwindCSS
- 🌐 Integração com backend Node.js + MongoDB

## 📂 Estrutura do Projeto

```bash
.
├── public/             # Imagens e arquivos estáticos
├── src/
│   ├── app/            # Rotas e páginas Next.js
│   ├── components/     # Componentes reutilizáveis
│   ├── context/        # Context API (Auth, Cart, etc.)
│   ├── services/       # Integração com backend (API calls)
│   ├── types/          # Tipagens TypeScript
│   └── utils/          # Funções auxiliares
├── tailwind.config.js  # Configuração do TailwindCSS
├── package.json
└── README.md
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/IsacAnd/uxstore-frontend.git

# Acessar a pasta
cd uxstore-frontend

# Instalar dependências
npm install
# ou
yarn install

# Rodar em modo de desenvolvimento
npm run dev
```

- Acesse http://localhost:3000 no navegador.

## 🔑 Variáveis de Ambiente

- Crie um arquivo .env.local na raiz do projeto com:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=seu_token_aqui
```
