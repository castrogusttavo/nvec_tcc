// src/usecases/registerUser.js

const jwt = require("jsonwebtoken");

const loginUser = async (userRepository, secretKey, bcrypt, userData) => {
  const { email, password } = userData;

  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign({ userId: user.id, username: user.username}, secretKey, { expiresIn: "1h" });
  return token;
}

module.exports = loginUser;
