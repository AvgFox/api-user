Uma API simples criada através de um desafio do meu curso de NODE.JS, para gerenciar usuários  (email e senha) utilizando Node.Js Express e Sequelize.

############################
TECNOLOGIAS
############################
Node.js - Ambiente de execução
Express - Framework para Node.js
Sequelize - ORM para banco de dados
MySQL2 - Driver para MySQL
Dotenv - Gerenciamento de variáveis de ambiente
Express Validator - Validação de dados
Body Parser - Middleware para lidar com JSON
Bcryptjs - Hash de senhas

############################
CONFIGURAÇÃO DO PROJETO
############################

1- CLONE O REPOSITÓRIO
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
2- INSTALE AS DEPENDÊNCIAS
npm install
3- CONFIGURE O BANCO DE DADOS
Dentro do projeto na pasta config/database.js você deve alterar as configurações de acordo com as duas credênciais do banco de dados.
4 - RODANDO AS MIGRATIONS
PS: Para criar a tabela users, será necessário descomentar o User.sync({force:true}); em models/User.js, depois que rodar comente novamente para não ficar criando uma a tabela toda vez que rodar o server.

############################
ENDPOINTS
############################
GET /users → Lista todos os usuários
GET /users/:id → Busca um usuário por ID
POST /users → Cria um novo usuário
PUT /users/:id → Atualiza um usuário
DELETE /users/:id → Remove um usuário

############################
SEGURANÇA
############################
As senhas são armazenadas utilizando bcryptjs.
Para evitar SQL Injection e outras vulnerabilidades, utlizei o Sequelize e Express Validator.

PS: Projeto simples, solicitado como desafio em um Curso de NODE.JS na UDEMY. x) Missão cumprida!
