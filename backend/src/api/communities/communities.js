const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// Rota POST para criar uma nova comunidade
router.post("/communities", async (req, res) => {
  try {
    const { nm_comunidade, id_categoria } = req.body;

    if (!nm_comunidade || !id_categoria) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const result = await db_query(
      "INSERT INTO tb_comunidade (nm_comunidade, id_categoria) VALUES (?, ?)",
      [nm_comunidade, id_categoria]
    );

    res.status(201).json({ id_comunidade: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir comunidade:", err);
    res.status(500).send("Erro ao inserir comunidade.");
  }
});

// Rota GET para buscar comunidades recentes
router.get("/recentCommunities", async (req, res) => {
  try {
    const recentCommunities = await db_query(
      "SELECT * FROM tb_comunidade ORDER BY id_comunidade DESC LIMIT 3"
    );

    res.status(200).json(recentCommunities);
  } catch (err) {
    console.error("Erro ao buscar comunidades recentes:", err);
    res.status(500).send("Erro ao buscar comunidades recentes.");
  }
});

// Rota GET para buscar todas as comunidades
router.get("/communities", async (req, res) => {
  try {
    const comunidades = await db_query("SELECT * FROM tb_comunidade");
    res.json(comunidades);
  } catch (err) {
    console.error("Erro ao buscar comunidades:", err);
    res.status(500).send("Erro ao buscar comunidades.");
  }
});

// Rota GET para buscar uma comunidade por ID
router.get("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;

    const comunidades = await db_query(
      "SELECT * FROM tb_comunidade WHERE id_comunidade = ?",
      [comunidadeId]
    );

    if (comunidades.length === 0) {
      return res.status(404).json({ error: "Comunidade não encontrada." });
    }

    res.json(comunidades[0]);
  } catch (err) {
    console.error("Erro ao buscar comunidade:", err);
    res.status(500).send("Erro ao buscar comunidade.");
  }
});

// Rota PUT para atualizar uma comunidade por ID
router.put("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;
    const { nm_comunidade, id_categoria } = req.body;

    if (!nm_comunidade || !id_categoria) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const result = await db_query(
      "UPDATE tb_comunidade SET nm_comunidade = ?, id_categoria = ? WHERE id_comunidade = ?",
      [nm_comunidade, id_categoria, comunidadeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Comunidade não encontrada." });
    }

    res.status(200).json({ message: "Comunidade atualizada com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar comunidade:", err);
    res.status(500).send("Erro ao atualizar comunidade.");
  }
});

// Rota DELETE para deletar uma comunidade por ID
router.delete("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;

    const result = await db_query("DELETE FROM tb_comunidade WHERE id_comunidade = ?", [comunidadeId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Comunidade não encontrada." });
    }

    res.status(204).json({ message: "Comunidade deletada com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar comunidade:", err);
    res.status(500).send("Erro ao deletar comunidade.");
  }
});

module.exports = router;
