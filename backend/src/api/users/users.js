const express = require("express");
const router = express.Router();
const {db_query} = require("../../db");

router.post("/users", async (req, res) => {
  try {
    const { nm_usuario, email_usuario, senha_usuario, id_assinatura } =
      req.body;

    const result = await db.query(
      "INSERT INTO tb_usuario (nm_usuario, email_usuario, senha_usuario, id_assinatura) VALUES (?, ?, ?, ?) RETURNING *",
      [nm_usuario, email_usuario, senha_usuario, id_assinatura]
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

    const user = await db.query(
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

    await db.query(
      "UPDATE tb_usuario SET nm_usuario = ?, email_usuario = ?, senha_usuario = ?, id_assinatura = ? WHERE id_usuario = ?",
      [nm_usuario, email_usuario, senha_usuario, id_assinatura, userId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).send("Erro ao atualizar usuário");
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    await db.query("DELETE FROM tb_usuario WHERE id_usuario = ?", [userId]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).send("Erro ao deletar usuário");
  }
});

module.exports = router;
