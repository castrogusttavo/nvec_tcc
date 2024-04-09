const userService = require('../services/userService');

// Controlador para criar um novo usuário
async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (err){
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createUser
};