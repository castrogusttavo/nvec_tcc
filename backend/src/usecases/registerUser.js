// src/usecases/registerUser.js

const bcrypt = require ('bcrypt');

const registerUser = async (userRepository, userData) => {
  const { username, password, email } = userData;

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Usuário já cadastrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser =  {
    username,
    password: hashedPassword,
    email
  };

  return userRepository.createUser(newUser);
}

module.exports = registerUser;