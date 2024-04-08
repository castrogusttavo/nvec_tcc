const authService = require('../services/authService');

// Controlador para criar um novo usuário
async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await authService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
}

// Controlador para buscar um usuário pelo ID
async function findUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await authService.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
  }
}

// Controlador para buscar um usuário pelo Email
async function findUserByEmail(req, res) {
  const userEmail = req.params.email;
  try {
    const user = await authService.findUserByEmail(userEmail);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await authService.updateUser(userId, name, email, password);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await authService.deleteUser(userId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: err.message });
  }
}

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser
};
