const userModel = require('../models/userModel');

// Função para criar um novo usuário
async function createUser(name, email, password) {
  try {
    const newUser = await userModel.create({ name, email, password });
    return newUser;
  } catch (err) {
    throw new Error('Erro ao criar usuário');
  }
}

module.exports = {
  createUser
};
