const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const { secretKey } = require('../config');

class AuthService {
  async authenticateUser(email, password) {
    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        return { success: false, message: 'Usuário não encontrado' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { success: false, message: 'Senha incorreta' };
      }

      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      return { success: true, token };
    } catch (err) {
      console.error('Erro ao autenticar usuário: ', err);
      return { success: false, message: 'Erro ao autenticar usuário' };
    }
  }

  async verifyToken(token) {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      const user = await db.User.findByPk(decodedToken.userId);
      return { success: true, user };
    } catch (err) {
      console.error('Erro ao verificar token: ', err);
      return { success: false, message: 'Erro ao verificar token' };
    }
  }
}

module.exports = new AuthService();
