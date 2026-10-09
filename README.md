# 🎬 MovieFlix API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

> Uma API RESTful moderna e robusta para gerenciamento de catálogo de filmes, integrando informações de gêneros, idiomas e premiações com documentação interativa via Swagger.

---

## 📌 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura e Design](#-arquitetura-e-design)
  - [Padrão Arquitetural](#padrão-arquitetural-layered-architecture)
  - [Fluxo de Requisições](#fluxo-de-uma-requisição)
  - [Estrutura de Pastas](#estrutura-de-pastas)
- [Modelagem do Banco de Dados](#-modelagem-do-banco-de-dados)
- [Documentação Interativa (Swagger)](#-documentação-interativa-swagger)
- [Endpoints da API](#-endpoints-da-api)
- [Como Executar o Projeto](#-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Passo a Passo](#passo-a-passo)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

O **MovieFlix** é uma API REST desenvolvida em **Node.js** com **TypeScript** e **Express**, utilizando **Prisma ORM** para comunicação com um banco de dados relacional **PostgreSQL**.

A aplicação foi projetada seguindo boas práticas de desenvolvimento de software, separação clara de responsabilidades (SoC), arquitetura em camadas (Controllers, Services, Repositories) e documentação padronizada via OpenAPI 3.0 / Swagger UI.

---

## ✨ Funcionalidades

- 📋 **Listagem Completa**: Consulta de todos os filmes ordenados alfabeticamente por título, incluindo os relacionamentos com seus respectivos gêneros e idiomas.
- 🔍 **Consulta Específica**: Busca detalhada de filme por identificador único (`id`).
- 🎭 **Filtro por Gênero**: Busca filtrada de filmes com base no nome do gênero cinematográfico.
- ➕ **Criação de Filmes**: Cadastro de novos títulos com validações e formatação automática de dados.
- ✏️ **Atualização Parcial**: Atualização via método `PATCH` para modificações pontuais no cadastro.
- 🗑️ **Exclusão de Filmes**: Remoção segura de registros de filmes pelo identificador.
- 📄 **Documentação Integrada**: Interface interativa Swagger pronta para testes diretos no navegador.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão Principal | Função |
|---|---|---|
| **[Node.js](https://nodejs.org/)** | LTS (>= 18.x) | Ambiente de execução JavaScript no servidor |
| **[TypeScript](https://www.typescriptlang.org/)** | ~7.0 / 5.x | Tipagem estática e segurança em tempo de compilação |
| **[Express](https://expressjs.com/)** | ^5.2 | Framework web minimalista para gerenciamento de rotas e middlewares |
| **[Prisma ORM](https://www.prisma.io/)** | ^4.16 | Mapeamento Objeto-Relacional (ORM) e migrações de banco |
| **[PostgreSQL](https://www.postgresql.org/)** | 14+ | Sistema de gerenciamento de banco de dados relacional |
| **[Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)** | ^5.0 | Renderização da documentação interativa da API |
| **[TSX](https://github.com/privatenumber/tsx)** | ^4.23 | Execução rápida de TypeScript com hot-reload no ambiente de desenvolvimento |
| **[Prettier](https://prettier.io/)** | ^3.9 | Padronização e formatação consistente de código |

---

## 🏛️ Arquitetura e Design

### Padrão Arquitetural (Layered Architecture)

O projeto adota a **Arquitetura em Camadas**, isolando o ciclo de vida da requisição HTTP das regras de negócio e da camada de persistência:

1. **Routes (`src/routes/`)**: Mapeia as URLs e verbos HTTP, acopla middlewares de validação e delega a execução para o Controller.
2. **Middlewares (`src/middlewares/`)**:
   - `movieMiddleware`: Normaliza e converte tipos primitivos recebidos no corpo da requisição (ex.: converte strings para datas e números).
   - `errorMiddleware`: Captura centralizada de exceções disparadas ao longo do fluxo, retornando status HTTP semânticos (400, 404, 500).
3. **Controllers (`src/controllers/`)**: Recebe a requisição (`Request`), valida inputs estruturais básicos e devolve a resposta adequada (`Response`) com os devidos códigos de status.
4. **Services (`src/services/`)**: Centraliza as regras de negócio e validações lógicas (ex.: conferir se campos obrigatórios foram informados, se contagem de Oscars não é negativa, etc.).
5. **Repositories (`src/repository/`)**: Camada de acesso a dados que encapsula as operações do Prisma Client, abstraindo as consultas e mutações ao banco de dados.

### Fluxo de uma Requisição

```
[ Cliente HTTP ]
       │
       ▼
[ Express Router ] ── (Middlewares: parsing, movieMiddleware)
       │
       ▼
[ Controller ]
       │
       ▼
[ Service ] (Validações de negócio & exceções personalizadas)
       │
       ▼
[ Repository ]
       │
       ▼
[ Prisma Client ] ──► [ Banco de Dados PostgreSQL ]
```

### Estrutura de Pastas

```text
MovieFlix/
├── prisma/
│   ├── migrations/          # Histórico de migrações SQL geradas pelo Prisma
│   └── schema.prisma        # Definição dos modelos e conexões com o banco
├── src/
│   ├── controllers/         # Controladores da aplicação (camada de apresentação HTTP)
│   │   └── movies.controllers.ts
│   ├── errors/              # Classes de erro customizadas (ex: NotFoundError, BadRequestError)
│   │   ├── bad-request.ts
│   │   └── not-found.error.ts
│   ├── middlewares/         # Middlewares Express (sanitização de dados e tratamento de erros)
│   │   ├── error.middleware.ts
│   │   └── movie.middleware.ts
│   ├── models/              # Interfaces e contratos de tipos TypeScript
│   │   └── movies.type.ts
│   ├── repository/          # Camada de comunicação com o Prisma ORM
│   │   └── movies.repository.ts
│   ├── routes/              # Definições de rotas da aplicação
│   │   └── movies.routes.ts
│   ├── services/            # Camada de regras de negócio
│   │   └── movies.service.ts
│   ├── app.ts               # Configuração da instância Express, middlewares globais e rotas
│   └── server.ts            # Ponto de inicialização do servidor HTTP
├── .env.example             # Exemplo das variáveis de ambiente necessárias
├── package.json             # Dependências e scripts do projeto
├── swagger.json             # Especificação OpenAPI 3.0 da API
└── tsconfig.json            # Configurações do compilador TypeScript
```

---

## 🗄️ Modelagem do Banco de Dados

O schema do banco de dados no Prisma (`prisma/schema.prisma`) é estruturado em três tabelas relacionais principais:

```mermaid
erDiagram
    GENRE ||--o{ MOVIE : "possui"
    LANGUAGE ||--o{ MOVIE : "possui"

    GENRE {
        int id PK
        string name
    }

    LANGUAGE {
        int id PK
        string name
    }

    MOVIE {
        int id PK
        string title
        datetime release_data
        int genre_id FK
        int language_id FK
        int oscar_count
    }
```

- **`genres`**: Armazena gêneros de filmes (`id`, `name`).
- **`languages`**: Armazena idiomas disponíveis (`id`, `name`).
- **`movies`**: Armazena os dados dos filmes (`id`, `title`, `release_data`, `genre_id`, `language_id`, `oscar_count`), com chave estrangeira opcional para gênero e idioma.

---

## 📑 Documentação Interativa (Swagger)

A API possui uma documentação interativa completa gerada via **Swagger UI**. Com o servidor em execução, acesse:

```
http://localhost:3000/docs
```

Pela interface do Swagger, você pode visualizar todos os schemas de entrada/saída, códigos de status esperados e testar as requisições em tempo real.

---

## 🌐 Endpoints da API

A rota base da API para os recursos de filmes é `/movies`.

| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|:---:|
| `GET` | `/movies` | Retorna todos os filmes (com gênero e idioma inclusos), ordenados por título | `200 OK` |
| `GET` | `/movies/:id` | Retorna os detalhes de um filme específico pelo ID | `200 OK` |
| `GET` | `/movies/genre/:genreName` | Retorna os filmes pertencentes a um gênero específico | `200 OK` |
| `POST` | `/movies` | Cadastra um novo filme | `201 Created` |
| `PATCH` | `/movies/:id` | Atualiza parcialmente os dados de um filme existente | `200 OK` |
| `DELETE` | `/movies/:id` | Remove um filme do catálogo | `200 OK` |
| `GET` | `/docs` | Interface de documentação Swagger | `200 OK` |

### Exemplos de Payload

#### `POST /movies` — Criar Filme
```json
{
  "title": "O Poderoso Chefão",
  "release_data": "1972-03-24",
  "genre_id": 1,
  "language_id": 1,
  "oscar_count": 3
}
```

#### `PATCH /movies/:id` — Atualização Parcial
```json
{
  "oscar_count": 4
}
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) em execução (ou container Docker)
- Gerenciador de pacotes `npm`, `yarn` ou `pnpm`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Phduartebjj/MovieFlix.git
   cd MovieFlix
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Copie o arquivo de exemplo e crie o seu `.env`:
   ```bash
   cp .env.example .env
   ```
   Abra o arquivo `.env` e ajuste a `DATABASE_URL` com as suas credenciais do PostgreSQL:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/movieflix?schema=public"
   ```

4. **Execute as Migrações do Banco:**
   Crie as tabelas no seu PostgreSQL utilizando o Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```

6. **Acesse a API:**
   - O servidor estará rodando em: `http://localhost:3000`
   - Acesse a documentação no navegador: `http://localhost:3000/docs`

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com hot-reload (`tsx watch`) |
| `npm run build` | Compila os arquivos TypeScript para a pasta `dist/` |
| `npm start` | Inicia a aplicação a partir do código transpilado em `dist/server.js` |
| `npm run format` | Executa o Prettier para formatar todos os arquivos TypeScript em `src/` |

---

## 🛡️ Tratamento de Erros

A API possui classes de erro customizadas e um middleware centralizado (`errorMiddleware`) que intercepta falhas e padroniza as respostas:

- **`BadRequestError` (HTTP 400)**: Disparado em falhas de validação de dados (campos vazios, dados com formato inconsistente, contagem negativa de Oscars, etc.).
- **`NotFoundError` (HTTP 404)**: Disparado quando um registro não for encontrado no banco de dados.
- **Erros Inesperados (HTTP 500)**: Qualquer exceção não mapeada retorna um erro interno do servidor seguro com a devida mensagem.

Estrutura da resposta de erro:
```json
{
  "message": "Descrição detalhada do erro ocorrido"
}
```

---

## 📄 Licença

Este projeto está sob a licença **ISC**. Consulte o arquivo [package.json](package.json) para mais detalhes.

---

<p align="center">
  Desenvolvido por <strong>Pedro Henrique Duarte</strong> 🚀
</p>
