const userModel = require('../models/userModel');

async function createUser(name, email, password) {
  try {
    const newUser = await userModel.create({ name, email, password });
    return newUser;
  } catch (err) {
    throw new Error('Erro ao criar usuário');
  }
}

async function findUserById(userId) {
  try {
    const user = await userModel.findByPk(userId); // Usar findByPk para buscar por ID
    return user;
  } catch (err) {
    throw new Error('Erro ao buscar usuário');
  }
}

async function findUserByEmail(userEmail) {
  try {
    const user = await userModel.findOne({ where: { email: userEmail } }); // Usar findOne para buscar por Email
    return user;
  } catch (err) {
    throw new Error('Erro ao buscar usuário');
  }
}

async function updateUser(userId, name, email, password) {
  try{
    const updateUser = await userModel.update({ name, email, password }, { where: { id: userId } }); // Usar update para atualizar usuário
    return updateUser;
  } catch (err) {
    throw new Error('Erro ao atualizar usuário');
  }
}

async function deleteUser(userId) {
  try{
    await userModel.destroy({ where: { id: userId } }); // Usar destroy para excluir usuário
  } catch (err) {
    throw new Error('Erro ao excluir usuário');
  }
}

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser
};
