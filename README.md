# 🗓️ Gerenciamento de Eventos 
Desenvolvimento de uma aplicação em TypeScript para gerenciar eventos e usuários utilizando um banco de dados SQLite. O sistema permite o gerenciamento de eventos, usuários e logs de ações realizadas no sistema.

![Image](https://github.com/user-attachments/assets/27b3fc5a-0689-4874-a62e-d5b092b5c30a)

## 🛠️ Tecnologias
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## ✨ Features
- **Gerenciamento de Eventos:** Permite adicionar, listar, listar por ID, atualizar e deletar eventos.
- **Gerenciamento de Usuários:** Permite adicionar, listar, listar por ID, atualizar e deletar usuários.
- **Registro de Logs:** Todas as ações realizadas nos eventos e usuários (inserir, alterar, deletar) são registradas em um arquivo de logs, incluindo o ID do log, usuário responsável, data/hora e a ação.
- **Validação de Dados:** Validações para garantir que os dados inseridos estejam corretos.
- **Banco de Dados SQLite:** Persistência de dados utilizando SQLite.

## 🏃‍♂️ Rodando Localmente

### Pré-requisitos

- Node.js instalado na sua máquina.
- NPM para gerenciar pacotes.

### ⚙️ Configuração do Turso com Drizzle ORM  

- **Turso CLI:** Siga as instruções na documentação do Turso CLI para instalar.

#### 1. Cadastro ou Login no Turso: 

- Cadastro:
```bash
turso auth signup
```
- Login:
```bash
turso auth login
```

#### 2. Criar um Novo Banco de Dados:

```bash
turso db create nome-banco
```

#### 3. Criar um Token de Autenticação:

```bash
turso db tokens create nome-banco
```

#### 4. Atualizar Variáveis de Ambiente:

```bash
TURSO_CONNECTION_URL=<sua_url_de_conexão>
TURSO_AUTH_TOKEN=<seu_token_de_autenticação>
```

#### 5. Aplicar Mudanças ao Banco de Dados:

Para gerar e aplicar migrações, utilize os seguintes comandos:

- Gerar Migrações
```bash
npx drizzle-kit generate
```

- Rodar Migrações:
```bash
npx drizzle-kit migrate
```

Alternativamente, você pode usar o comando de push para aplicar mudanças diretamente:
```bash
npx drizzle-kit push
```

### Passos para rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/vximoraes/eventory.git
```

2. Acesse o diretório do projeto:
```bash
cd eventory 
```

3. Instale as dependências:
```bash
npm install  
```

4. Faça o build do TypeScript:
```bash
npm run build
```

5. Executre o projeto:
```bash
npm run start 
```
6. Ao iniciar a aplicação, você será solicitado a fazer login. Utilize as seguintes credenciais padrão:

  - Usuário: ```Admin```
  - Senha: ```#Admin12345```

## ⌨️ Navegação na Interface
A aplicação possui uma interface interativa que permite navegar pelas opções utilizando as ```Setas do Teclado (⬆️⬇️)``` e a tecla ```Enter(↩️)``` para selecionar a opção desejada. Isso torna o uso do sistema mais intuitivo e fácil de operar.
