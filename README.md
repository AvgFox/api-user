Uma API simples criada através de um desafio do meu curso de NODE.JS, para gerenciar usuários  (email e senha) utilizando Node.Js Express e Sequelize.

Tecnologias:
Node.js
Express
Sequelize (ORM para banco de dados)
MySQL (ou outro banco configurado no Sequelize)
Validator (para validação de dados)
Dotenv (para variáveis de ambiente)
Body-Parser (para interpretar JSON e URL-encoded)

Dependências 
Instale todas as dependências com:
npm install
"dependencies": {
  "express": "^4.x",
  "sequelize": "^6.x",
  "mysql2": "^3.x",
  "dotenv": "^16.x",
  "express-validator": "^7.x",
  "body-parser": "^1.x"
}

Como rodar o projeto
Clone o repositório:
git clone https://github.com/AvgFox/api-user.git

Instale as dependências:
npm install

Configure o banco no config/database.js

Rode as migrations:
npx sequelize db:migrate

Inicie o servidor:
npm start
Endpoints
GET /users → Lista usuários
GET /users/:id → Busca um usuário
POST /users → Cria um usuário
PUT /users/:id → Atualiza um usuário
DELETE /users/:id → Remove um usuário
