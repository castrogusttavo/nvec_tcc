// src/interfaces/repositories/userRepository.js

const User = require('../../entities/user')

class UserRepository {
  constructor(db) {
    this.db = db
  }

  async createUser(user) {
    const { username, email, password} = user;
    const [ result ] = await this.db.execute(
      'INSERT INTO tb_usuario (nm_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)',
      [ username, email, password ]
    );
    return new User({
      id: result.insertId,
      username,
      email,
      password
    });
  }

  async findUserByEmail(email) {
    const [rows] = await this.db.execute(
      'SELECT * FROM tb_usuario WHERE email_usuario = ?',
      [email]
    );
    if (rows.length === 0) {
      return null;
    }
    const { id, nm_usuario: username, email_usuario: userEmail, senha_usuario: password } = rows[0];
    return new User({ id, username, email: userEmail, password });
  }
}

module.exports = UserRepository;