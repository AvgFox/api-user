const { where } = require("sequelize");
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcryptjs");



/**
 * Cria um novo usuário no banco de dados.
 * Valida email e senha antes de salvar. 
 */
const createUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Campos email e password obrigatórios" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Email inválido" });
        }
        if (!validator.isLength(password, { min: 8 })) {
            return res.status(400).json({ error: "A senha deve ter no mínimo 8 caracteres" });
        }

        // Verfica se o usuário (email) já existe no banco 
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({ error: "E-mail já cadastrado" });
        }

        //Gera um hash seguro para a senha antes de salvar no banco
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt);

        //Cria um novo usuário com email e senha criptografada
        const newUser = await User.create({
            email,
            password: hash
        });

        if (newUser) {
            return res.status(201).json({
                message: `Usuário ${email} criado com sucesso`,
                user: {
                    id: newUser.id,
                    email: newUser.email
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}

/**
 * Lista os dados de todos os usuários do banco de dados.
 * Não devolve a senha do usuário, por segurança
 */
const getUser = async (req, res) => {

    try {
        // Lista os dados de todos usuários, deolvendo somente os atributos id e email
        const users = await User.findAll({
            atributes: ['id', 'email'],
            order: [['id', 'DESC']]
        });
        if (users) {
            return res.status(200).json({ users });
        } else {
            return res.status(404).json({ error: 'Erro ao listar usuários' });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}


/**
 * Lista os dados do usuário passando o id como parâmetro
 * Não devolve a senha do usuário por segurança
 */
const fetchUser = async (req, res) => {

    try {

        const id = req.params.id;

        if (isNaN(id) || !id) {
            return res.status(400).json({ error: "ID inválido" });
        }

        // Busca o usuario pelo id e retorna os atributos de id e email
        const user = await User.findByPk(id,{
            atributes: ['id', 'email']
        });

        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}


/**
 * Lista os dados do usuário passando o id como parâmetro
 * Não devolve a senha do usuário por segurança
 */
const updateUser = async (req, res) => {
    try {

        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;

        if (isNaN(id) || !id) {
            return res.status(404).json({ error: "ID inválido" });
        }
        // Busca o usuário pelo id
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontradO" });
        }

        // Objeto para armazenar os campos que serão atualizados
        let updates = {};

        // Validação e atualização do email, caso seja fornecido
        if (email && email != user.email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: "E-mail inválido" });
            }

            // Verifica se o email ja existe no banco
            const emailExists = await User.findOne({
                where: { email }
            });

            if (emailExists) {
                return res.status(400).json({ error: "Este email já está cadastrado no sistema." });
            }

            updates.email = email;
        }
         // Validação e atualização da senha, caso seja fornecida
        if (password) {
            if (!validator.isLength(password, { min: 8 })) {
                return res.status(400).json({ error: "A senha deve ter no mínimo 8 caracteres" });
            }

            //Verifica se nova seha é diferente da atual
            const isSamePassword = bcrypt.compareSync(password, user.password);
            if (isSamePassword) {
                return res.status(400).json({ error: "A nova senha deve ser diferente da senha atual" });
            }

            // Gera um hash
            const salt = bcrypt.genSaltSync(10);
            updates.password = bcrypt.hashSync(password, salt);
        }

        //Verifica se existe algo para atualizar
        if (Object.keys(updates).length > 0) {
            await User.update(updates, { where: { id } });
            return res.status(200).json({ message: "Usuário atualizado com sucesso" });
        }

        return res.status(400).json({ error: "Nenhum dado foi alterado" });

    } catch (error) {
        return res.status(500).json({ error: "Erro no servidor" });

    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        if (isNaN(id) || !id) {
            return res.status(400).json({ error: "ID não encontrado" });
        }
        //Busca o usuário pelo id 
        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        //Remove o usuário do banco de dados (Hard Delete)
        const deleteUserRows = await User.destroy({
            where: {id}
        });

        if(deleteUserRows > 0){
            return res.status(200).json({ message: "Usuário excluído com sucesso" });  
        }else{
            return res.status(400).json({ message: "Erro ao excluir o usuário" });  
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro no servidor" });
    }
}

module.exports = { createUser, getUser, fetchUser, updateUser, deleteUser };