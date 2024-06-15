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
  
  // Rota para atualizar o usuário
  router.patch("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id; // Obtendo o ID do usuário dos parâmetros da URL
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
  
      // Obter os dados atualizados do usuário
      const updatedUser = await db_query("SELECT * FROM tb_usuario WHERE id_usuario = ?", [userId]);
  
      if (updatedUser.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      // Gerar um token JWT para o usuário atualizado
      const newToken = jwt.sign(
        {
          userId: updatedUser[0].id_usuario,
          userEmail: updatedUser[0].email_usuario,
          userName: updatedUser[0].nm_usuario,
          subscriptionId: updatedUser[0].id_assinatura
        },
        secretKey,
        { expiresIn: "3h" }
      );
  
      // Extraindo os dados do usuário atualizados
      const userData = {
        id_usuario: updatedUser[0].id_usuario,
        name: updatedUser[0].nm_usuario,
        email: updatedUser[0].email_usuario,
        password: updateData.senha_usuario ? updateData.senha_usuario : undefined,
        subscriptionId: updatedUser[0].id_assinatura
      };
  
      res.cookie("token", newToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });
  
      // Retornar o token e os dados do usuário atualizados
      res.json({ token: newToken, userData });
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
  router.post('/logout', (req, res) => {
    // Limpar o cookie do token JWT
    res.clearCookie('token').json({ message: 'Sessão encerrada com sucesso' });
  });

  // Alter Data User
  router.patch("/users/:id", verifyToken, async (req, res) => {
    try {
      const userId = req.params.id; // Obtendo o ID do usuário dos parâmetros da URL
      const updateData = req.body;
  
      // Verifique se o usuário autenticado está tentando atualizar seu próprio perfil
      if (req.userId != userId) {
        return res.status(403).json({ error: "Acesso negado. Você só pode atualizar seu próprio perfil." });
      }
  
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
  
      // Obter os dados atualizados do usuário
      const updatedUser = await db_query("SELECT * FROM tb_usuario WHERE id_usuario = ?", [userId]);
  
      if (updatedUser.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      // Gerar um token JWT para o usuário atualizado
      const newToken = jwt.sign(
        {
          userId: updatedUser[0].id_usuario,
          userEmail: updatedUser[0].email_usuario,
          userName: updatedUser[0].nm_usuario,
          subscriptionId: updatedUser[0].id_assinatura
        },
        secretKey,
        { expiresIn: "3h" }
      );
  
      // Extraindo os dados do usuário atualizados
      const userData = {
        id_usuario: updatedUser[0].id_usuario,
        name: updatedUser[0].nm_usuario,
        email: updatedUser[0].email_usuario,
        password: updateData.senha_usuario ? updateData.senha_usuario : undefined,
        subscriptionId: updatedUser[0].id_assinatura
      };
  
      res.cookie("token", newToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });
  
      // Retornar o token e os dados do usuário atualizados
      res.json({ token: newToken, userData });
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).send("Erro ao atualizar usuário");
    }
  });

  // Rota de registro
  const rounds = 10;

  router.post("/register", async (req, res) => {
    try {
      const { name, email, password   } = req.body;

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

      const user = await db_query(
        "SELECT * FROM tb_usuario WHERE email_usuario = ?",
        [email]
      );

      // Gerar um token JWT para o usuário recém-cadastrado
      const token = jwt.sign(
        { 
          userId: result.insertId, 
          userEmail: email, 
          userName: name,
         subscriptionId: user[0].id_assinatura
        },
        secretKey,
        { expiresIn: "3h" }
      );

      // Extraindo os dados do usuário
      const userData = {
        id_usuario: result.insertId,
        name: name,
        email: email,
        password: password,
       subscriptionId: user[0].id_assinatura
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
          subscriptionId: user[0].id_assinatura
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
        subscriptionId: user[0].id_assinatura
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