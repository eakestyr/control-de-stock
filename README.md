# Controle de Estoque (MVP)

Este é um MVP de um controle de estoque simples de utilizar. Possui funcionalidades simples de um Controle de Estoque como:

- Criar uma conta / Entrar com uma conta
- Cadastrar Produto
- Remover Produto
- Editar Produto
- Buscar um produto / Mostrar todos os produtos

Você deve criar uma conta e fazer login para poder acessar a esta parte do painel que disponibiliza essas informações, e desta forma podendo fazer o controle do seu estoque.

**AVISO:** O projeto foi construido em 1 dia e meio, e por isso possui apenas as funcionalidades básicas, e não estão 100% perfeitas, com toda certa, mas é o meu primeiro projeto em desenvolvimento web. Sinta-se livre para baixar o projeto ou clona-lo e utiliza-lo, fazer modificações, etc.

## Ferramentas utilizadas

- Frontend: Vue3 + TailwindCSS + Fontawesome CDN + TypeScript
- Backend: NodeJS com ExpressJS + Prisma ORM + MariaDB

A ideia do projeto era começar e escrever este produto em React, mas devido a facilidade do Vue e de um conhecimento um pouco melhor do Vue3, optei por escrever ele neste framework. MariaDB foi a escolha principal como banco de dados ao invés do MongoDB ou PostgreSQL porque era o que eu já conhecia previamente, então fiz a instalação, configurei e setei no Prisma para usa-lo.

### Como instalar e executar?

1. Clone ou instale o .zip do projeto.
2. Acesse a pasta do projeto e entre em `frontend/` e `backend/` e execute este comando nas duas pastas: `npm install`.
3. Tenha um banco de dados e o nodejs (junto com o typescript) instalado em seu computador.
4. Modifique o ".env" na pasta `backend/` para acessar as configurações de entrada do seu backend.
5. Execute `npm run dev` na pasta `frontend/` e `node dist/server.js` na pasta `backend/` e teste o produto.

#### Capturas de tela

**Páginas padrão sem produtos:** 
![Página de Login](https://i.postimg.cc/G2XKJSDH/page-login.png)  
![Página de Registro](https://i.postimg.cc/hjYxGFxb/page-registrar.png)  
![Página do Painel](https://i.postimg.cc/yd3hcY7r/page-principal.png)  
![Página de Cadastrar Produto](https://i.postimg.cc/x17cHGqn/page-cadastrar-produto.png)  
![Página do Editar Produto](https://i.postimg.cc/wBXgvDmW/page-editar-produto.png)  
![Página do Remover Produto](https://i.postimg.cc/K8FyWRVB/page-remover-produto.png)  

**Páginas padrão com produtos**  
![Página do Painel](https://i.postimg.cc/9QNJ7kG0/page-principal-com-produto.png)  
![Página do Editar Produto](https://i.postimg.cc/8P7FCnPt/page-editar-produto-com-produto.png)

##### Copyright @ 2025 @eakestyr
