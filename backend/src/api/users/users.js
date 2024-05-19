const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");
const bcrypt = require("bcrypt");

module.exports = function (secretKey) {
  function verifyToken(req, res, next) {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token de autorização não fornecido." });
    }
  
    const token = authorization.split(" ")[1];
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
      }
      req.userId = decoded.userId;
      req.userEmail = decoded.userEmail;
      next();
    });
  }

  router.post("/users", async (req, res) => {
    try {
      const { nm_usuario, email_usuario, senha_usuario } = req.body;

      const result = await db_query(
        "INSERT INTO tb_usuario (nm_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)",
        [nm_usuario, email_usuario, senha_usuario]
      );

      res.status(201).json({ id_usuario: result.insertId });
    } catch (err) {
      console.error("Erro ao inserir usuário:", err);
      res.status(500).send("Erro ao inserir um novo usuário");
    }
  });

  router.get("/users", async (req, res) => {
    try {
      const users = await db_query("SELECT * FROM tb_usuario");

      res.json(users);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      res.status(500).send("Erro ao buscar usuários");
    }
  });

  router.get("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await db_query(
        "SELECT * FROM tb_usuario WHERE id_usuario = ?",
        [userId]
      );

      if (user.length === 0) {
        res.status(404).send("Usuário não encontrado");
        return;
      }

      res.json(user[0]);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      res.status(500).send("Erro ao buscar usuário");
    }
  });

  router.put("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const { nm_usuario, email_usuario, senha_usuario, id_assinatura } =
        req.body;

      await db_query(
        "UPDATE tb_usuario SET nm_usuario = ?, email_usuario = ?, senha_usuario = ?, id_assinatura = ? WHERE id_usuario = ?",
        [nm_usuario, email_usuario, senha_usuario, id_assinatura, userId]
      );

      res.sendStatus(200);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).send("Erro ao atualizar usuário");
    }
  });

  router.patch("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      // Crie a query dinamicamente com base nos campos fornecidos
      let query = "UPDATE tb_usuario SET ";
      const updateFields = [];
      const values = [];

      // Verifique quais campos foram fornecidos para atualização
      if (updateData.nm_usuario) {
        query += "nm_usuario = ?, ";
        values.push(updateData.nm_usuario);
      }

      if (updateData.email_usuario) {
        query += "email_usuario = ?, ";
        values.push(updateData.email_usuario);
      }

      if (updateData.senha_usuario) {
        const hashedPassword = await bcrypt.hash(updateData.senha_usuario, 10);
        query += "senha_usuario = ?, ";
        values.push(hashedPassword);
      }

      if (updateData.id_assinatura) {
        query += "id_assinatura = ?, ";
        values.push(updateData.id_assinatura);
      }

      // Remova a vírgula no final e adicione a cláusula WHERE
      query = query.slice(0, -2) + " WHERE id_usuario = ?";
      values.push(userId);

      await db_query(query, values);

      res.sendStatus(204); // Sucesso, sem conteúdo
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).send("Erro ao atualizar usuário");
    }
  });

  router.delete("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;

      await db_query("DELETE FROM tb_usuario WHERE id_usuario = ?", [userId]);

      res.sendStatus(200);
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      res.status(500).send("Erro ao deletar usuário");
    }
  });

  // LogOut
  router.post("/logout", (req, res) => {
    // Limpar o cookie do token JWT
    res.clearCookie("token").send("Sessão encerrada com sucesso");
  });

  // Alter Password
  router.patch("/change-password", verifyToken, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.userId;
  
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Dados insuficientes para alteração de senha." });
      }
  
      if (newPassword.length < 8) {
        return res.status(400).json({ error: "A nova senha deve ter pelo menos 8 caracteres." });
      }
  
      // Recuperar o usuário pelo ID
      const user = await db_query("SELECT * FROM tb_usuario WHERE id_usuario = ?", [userId]);
  
      if (user.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      // Comparar a senha atual com o hash armazenado
      const passwordMatch = await bcrypt.compare(currentPassword, user[0].senha_usuario);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Senha atual incorreta." });
      }
  
      // Criptografar a nova senha
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Atualizar a senha no banco de dados
      await db_query("UPDATE tb_usuario SET senha_usuario = ? WHERE id_usuario = ?", [hashedNewPassword, userId]);
  
      res.status(200).json({ message: "Senha alterada com sucesso." });
    } catch (err) {
      console.error("Erro ao alterar a senha:", err);
      res.status(500).json({ error: "Erro ao alterar a senha." });
    }
  });

  // Rota de registro
  const rounds = 10;

  router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const emailCheck = await db_query(
        "SELECT * FROM tb_usuario WHERE email_usuario = ?",
        [email]
      );

      if (emailCheck.length > 0) {
        res.status(409).json({ error: "Email já cadastrado" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, rounds);

      const result = await db_query(
        "INSERT INTO tb_usuario (nm_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      // Gerar um token JWT para o usuário recém-cadastrado
      const token = jwt.sign(
        { userId: result.insertId, userEmail: email, userName: name },
        secretKey,
        { expiresIn: "3h" }
      );

      // Extraindo os dados do usuário
      const userData = {
        id_usuario: result.insertId,
        name: name,
        email: email,
        password: password,
      };

      // Exibir os dados do usuário no console
      console.log("Dados do usuário registrados:", userData);

      // Enviar o token JWT como cookie
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });

      res
        .status(201)
        .json({
          id_usuario: result.insertId,
          token,
          message: "Registro bem-sucedido",
        });
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      res.status(500).send("Erro ao registrar um novo usuário");
    }
  });

  // Rota de login
  router.post("/login", async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Encontrar o usuário pelo email
      const user = await db_query(
        "SELECT * FROM tb_usuario WHERE email_usuario = ?",
        [email]
      );

      if (user.length === 0) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      // Comparar a senha hash com a senha enviada pelo usuário
      const passwordMatch = await bcrypt.compare(senha, user[0].senha_usuario);

      if (!passwordMatch) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      // Gerar um token JWT usando a chave secreta do server.js e definir a expiração para 3 horas
      const token = jwt.sign(
        {
          userId: user[0].id_usuario,
          userEmail: user[0].email_usuario,
          userName: user[0].nm_usuario,
        },
        secretKey,
        { expiresIn: "3h" }
      );

      // Extraindo os dados do usuário
      const userData = {
        id_usuario: user[0].id_usuario,
        name: user[0].nm_usuario,
        email: user[0].email_usuario,
        password: senha,
      };

      // Exibir os dados do usuário no console
      console.log("Dados do usuário logado:", userData);

      // Enviar o token JWT como cookie
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });

      res.status(200).json({ token });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).send("Erro ao fazer login");
    }
  });
  return router;
};
