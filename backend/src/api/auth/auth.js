const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db_query } = require("../../frameworks/db/db");
const { verifyToken } = require("../../middleware/user");

const router = express.Router();

module.exports = function () {
  // Função para gerar token JWT
  function generateToken(userId, userEmail, userName) {
    return jwt.sign(
      { userId, userEmail, userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" }
    );
  }

  // Rota de registro de usuário
  router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Verificar se o email já está cadastrado
      const existingUser = await db_query(
        "SELECT * FROM tb_usuario WHERE email_usuario = ?",
        [email]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({ error: "Email já cadastrado" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserir novo usuário no banco de dados
      const result = await db_query(
        "INSERT INTO tb_usuario (nm_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      // Gerar token JWT para o usuário registrado
      const token = generateToken(result.insertId, email, name);

      res.status(201).json({
        id_usuario: result.insertId,
        token,
        message: "Registro bem-sucedido",
      });
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      res.status(500).send("Erro ao registrar um novo usuário");
    }
  });

  // Rota de login de usuário
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuário pelo email
      const user = await db_query(
        "SELECT * FROM tb_usuario WHERE email_usuario = ?",
        [email]
      );

      if (user.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Verificar a senha
      const passwordMatch = await bcrypt.compare(
        password,
        user[0].senha_usuario
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Gerar token JWT para o usuário autenticado
      const token = generateToken(
        user[0].id_usuario,
        email,
        user[0].nm_usuario
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).send("Erro ao fazer login");
    }
  });

  // LogOut
  router.post("/logout", (req, res) => {
    // Limpar o cookie do token JWT
    res.clearCookie("token").json({ message: "Sessão encerrada com sucesso" });
  });

  // Alterar senha
  router.patch("/change-password", verifyToken, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.userId;

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Dados insuficientes para alteração de senha." });
      }

      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ error: "A nova senha deve ter pelo menos 8 caracteres." });
      }

      // Recuperar o usuário pelo ID
      const user = await db_query(
        "SELECT * FROM tb_usuario WHERE id_usuario = ?",
        [userId]
      );

      if (user.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Comparar a senha atual com o hash armazenado
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user[0].senha_usuario
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Senha atual incorreta." });
      }

      // Criptografar a nova senha
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Atualizar a senha no banco de dados
      await db_query(
        "UPDATE tb_usuario SET senha_usuario = ? WHERE id_usuario = ?",
        [hashedNewPassword, userId]
      );

      res.status(200).json({ message: "Senha alterada com sucesso." });
    } catch (err) {
      console.error("Erro ao alterar a senha:", err);
      res.status(500).json({ error: "Erro ao alterar a senha." });
    }
  });
};
