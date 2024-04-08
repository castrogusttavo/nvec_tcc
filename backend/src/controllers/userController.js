const userService = require('../services/userService');

// Controlador para criar um novo usuário
async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.createUser(name, email, password)
    res.status(201).json(newUser);
  } catch (err){
    res.status(500).json({ message: err.message });
  }
}

// Controlador para buscar um usuário pelo ID
async function findUserById(req, res) {
  const userID = req.params.id;
  try {
    const user = await userService.findUserById(userID);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(user);
  } catch (err){
    res.status(500).json({ message: err.message });
  }
}

// Controlador para buscar um usuário pelo Email
async function findUserByEmail(req, res) {
  const userEmail = req.params.id;
  try {
    const user = await userService.findUserByEmail(userEmail);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(user);
  } catch (err){
    res.status(500).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const updateUser = await userService.updateUser(userId, name, email, password);
    res.json(updateUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await userService.deleteUser(userId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
}

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser
};