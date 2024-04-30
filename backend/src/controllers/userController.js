// src/controllers/userController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: './src/.env' }); // Certifique-se de que as variáveis de ambiente são carregadas

const UserRepository = require("../interfaces/repositories/userRepository");
/* const userRepository = new UserRepository(db); */

const secretKey = process.env.JWT_SECRET_KEY; // Pegue a secret key do .env

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { username, email, password: hashedPassword };

      const user = await this.userRepository.createUser(newUser);
      res.status(201).json({ message: "Usuário registrado com sucesso", user });
    } catch (err) {
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
      res.status(200).json({ message: `Welcome, ${user.username}`, token });
    } catch (err) {
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  }
}

module.exports = new UserController(UserRepository);
