# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Biblioteca (Frontend)

  Este repositório contém o frontend da aplicação Biblioteca — uma interface construída com React + TypeScript + Vite para consumir a API do backend do projeto.

  O backend de referência está em: https://github.com/abswing/Biblioteca

  **Resumo**

  Aplicação single-page para gerenciar clientes, livros e retiradas, utilizando os serviços em `src/service/` para se comunicar com a API.

  **Tecnologias Utilizadas**

  - React
  - TypeScript
  - Vite
  - Axios (consumo da API)
  - ESLint

  **Estrutura do Projeto**

  - `src/` : código fonte
    - `App.tsx`, `main.tsx`, `Router.tsx` : inicialização e rotas
    - `components/` : componentes principais da UI
      - `Home.tsx`, `Menu.tsx`
      - `form/` : formulários (`FormCliente.tsx`, `FormLivros.tsx`, `FormRetirada.tsx`)
      - `list/` : listas (`ListClientes.tsx`, `ListLivros.tsx`, `ListRetiradas.tsx`)
    - `service/` : chamadas à API (`ClienteApiService.ts`, `LivroApiService.ts`, `RetiradaApiService.ts`) e `ApiErrorHelper.ts`
    - `types/` : tipos TypeScript
    - `components/data/categories/` : dados estáticos de categorias

  **Funcionalidades**

  - Listar, criar, editar e remover clientes
  - Listar, criar, editar e remover livros
  - Registrar e listar retiradas de livros
  - Consumir endpoints do backend via Axios

  **Configuração de Ambiente**

  Crie um arquivo `.env` na raiz do projeto para definir a URL base da API. No Vite, variáveis que começam com `VITE_` ficam disponíveis no código.

  Exemplo mínimo de `.env`:

  ```
  VITE_API_BASE_URL=http://localhost:3000
  ```

  Ajuste a porta/URL conforme a instância do backend (ver https://github.com/abswing/Biblioteca).

  **Scripts úteis**

  - Instalar dependências:

  ```bash
  npm install
  ```

  - Desenvolvimento (HMR):

  ```bash
  npm run dev
  ```

  - Build de produção:

  ```bash
  npm run build
  ```

  - Servir o build localmente (preview):

  ```bash
  npm run preview
  ```

  - Executar lint:

  ```bash
  npm run lint
  ```

  Os scripts acima estão definidos em `package.json` (`dev`, `build`, `preview`, `lint`).

  **Como conectar ao backend**

  1. Inicie a API do backend (veja https://github.com/abswing/Biblioteca). Por padrão o backend costuma rodar em `http://localhost:3000` (verifique o `docker-compose` ou o `src/app.ts` do backend).
  2. Defina `VITE_API_BASE_URL` no `.env` para apontar para a URL da API.
  3. Inicie o frontend com `npm run dev`.

  Os serviços em `src/service/*.ts` usam `VITE_API_BASE_URL` para compor as rotas da API.

  **Execução com Docker (opcional)**

  O frontend não inclui um `Dockerfile` por padrão neste repositório. Para produção você pode gerar o `build` (`npm run build`) e servir os arquivos estáticos com um servidor como Nginx em um contêiner Docker.

  Exemplo rápido (fora do escopo deste README):

  - Gerar `dist/` com `npm run build`
  - Criar uma imagem que copia `dist/` para Nginx e expõe a porta 80

  **Testes e Postman**

  Este repositório não traz uma coleção Postman por padrão. Para testar os endpoints frontend-backend:

  - Verifique as rotas consumidas em `src/service/`
  - Use o backend `Biblioteca` e importe a coleção Postman presente no repositório do backend, caso exista

  **Observações**

  - Garanta que o backend esteja configurado e rodando antes de testar o frontend.
  - Ajuste `VITE_API_BASE_URL` conforme o ambiente (desenvolvimento/staging/produção).
  - É recomendável adicionar testes automatizados e CI/CD mais adiante.

  **Contribuições**

  Fique à vontade para abrir issues e pull requests. Descreva mudanças de forma clara e atualize este README quando necessário.

  **Licença**

  Este projeto é de caráter acadêmico/demonstrativo. Utilize e adapte conforme necessário.
