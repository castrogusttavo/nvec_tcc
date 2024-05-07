const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");
const bcrypt = require('bcrypt');

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

    const user = await db_query("SELECT * FROM tb_usuario WHERE id_usuario = ?", [userId]);

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
    const { nm_usuario, email_usuario, senha_usuario, id_assinatura } = req.body;

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

// Rota de SingUp
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Encontrar o usuário pelo email
    const user = await db_query("SELECT * FROM tb_usuario WHERE email_usuario = ?", [email]);

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

    // Criar uma sessão ao fazer login com sucesso
    req.session.userId = user[0].id_usuario;
    req.session.userEmail = user[0].email_usuario;
    req.session.userName = user[0].nm_usuario;

    console.log("Sessão criada:", req.session); 

    res.status(200).json({ message: "Login bem-sucedido" });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).send("Erro ao fazer login");
  }
});

// Rota de Registro
const rounds = 10;

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailCheck = await db_query("SELECT * FROM tb_usuario WHERE email_usuario = ?", [email]);

    if (emailCheck.length > 0) {
      res.status(409).json({ error: "Email já cadastrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, rounds);

    const result = await db_query(
      "INSERT INTO tb_usuario (nm_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Criar uma sessão ao registrar um usuário com sucesso
    req.session.userId = result.insertId;
    req.session.userEmail = email;
    req.session.userName = name;

    console.log("Sessão criada:", req.session); // Adicione esta linha para verificar se a sessão é configurada

    res.status(201).json({ id_usuario: result.insertId, message: "Registro bem-sucedido" });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).send("Erro ao registrar um novo usuário");
  }
});


// LogOut
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao destruir a sessão:", err);
      return res.status(500).send("Erro ao sair");
    }
    res.send("Sessão encerrada com sucesso");
  });
});

// Alter Password
router.patch("/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "Dados insuficientes para alteração de senha." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: "A nova senha deve ter pelo menos 8 caracteres." });
    }

    // Recuperar o usuário pelo email
    const user = await db_query("SELECT * FROM tb_usuario WHERE email_usuario = ?", [email]);

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
    await db_query(
      "UPDATE tb_usuario SET senha_usuario = ? WHERE email_usuario = ?",
      [hashedNewPassword, email]
    );

    res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (err) {
    console.error("Erro ao alterar a senha:", err);
    res.status(500).json({ error: "Erro ao alterar a senha." });
  }
});

router.get("/latest-user", async (req, res) => {
  try {
    // Consulta para obter o usuário mais recente pelo campo 'id_usuario'
    const result = await db_query("SELECT nm_usuario FROM tb_usuario ORDER BY id_usuario DESC LIMIT 1");

    if (result.length > 0) {
      const userName = result[0].nm_usuario; // Nome do usuário mais recente
      res.status(200).json({ userName }); // Retornar o nome
    } else {
      res.status(404).json({ error: "Nenhum usuário encontrado" });
    }
  } catch (err) {
    console.error("Erro ao buscar o usuário mais recente:", err);
    res.status(500).json({ error: "Erro ao buscar o usuário mais recente" });
  }
});

module.exports = router;
