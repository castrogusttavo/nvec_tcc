const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/communities", async (req, res) => {
  try {
    const { nm_comunidade, id_categoria } = req.body;

    const result = await db_query(
      "INSERT INTO tb_comunidade (nm_comunidade, id_categoria) VALUES (?, ?) RETURNING *",
      [nm_comunidade, id_categoria]
    );

    res.status(201).json({ id_comunidade: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir comunidade", err);
    res.sendStatus(500).send("Erro ao inserir comunidade");
  }
});


router.get('/recentCommunities', async (req, res) => {
  try {
    const recentCommunities = await db_query(`
      SELECT * FROM tb_comunidade ORDER BY id_comunidade DESC LIMIT 3
    `);

    res.status(200).json(recentCommunities);
  } catch(err) {
    console.error("Erro ao buscar comunidades recentes", err);
    res.sendStatus(500).send("Erro ao buscar comunidades recentes");
  }
});

router.get("/communities", async (req, res) => {
  try {
    const comunidades = await db_query("SELECT * FROM tb_comunidade");

    res.json(comunidades);
  } catch (err) {
    console.error("Erro ao buscar comunidades", err);
    res.sendStatus(500).send("Erro ao buscar comunidades");
  }
});

router.get("/communities/:id", async (req, res) => {
  try {
    const comunidadesId = req.params.id;

    const comunidades = await db_query(
      "SELECT * FROM tb_comunidade WHERE id_comunidade = ?",
      [comunidadesId]
    );

    if (comunidades.length === 0) {
      res.status(404).send("Comunidade não encontrada");
      return;
    }

    res.json(comunidades[0]);
  } catch (err) {
    console.error("Erro ao buscar comunidade", err);
    res.sendStatus(500).send("Erro ao buscar comunidade");
  }
});

router.put("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;
    const { nm_comunidade, id_categoria } = req.body;

    await db_query(
      "UPDATE tb_comunidade SET nm_comunidade = ?, id_categoria = ? WHERE id_comunidade = ?",
      [nm_comunidade, id_categoria, comunidadeId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar comunidade", err);
    res.sendStatus(500).send("Erro ao atualizar comunidade");
  }
});

router.delete("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;

    await db_query("DELETE FROM tb_comunidade WHERE id_comunidade = ?", [
      comunidadeId,
    ]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar comunidade", err);
    res.sendStatus(500).send("Erro ao deletar comunidade");
  }
});

module.exports = router;
