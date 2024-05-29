const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/measures", async (req, res) => {
  try {
    const { ds_medida } = req.body;

    const result = await db_query(
      "INSERT INTO tb_medida_item (ds_medida) VALUES (?) RETURNING *",
      [ds_medida]
    );

    res.status(201).json({ id_medida: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir medida", err);
    res.status(500).send("Erro ao inserir medida");
  }
});

router.get("/measures", async (req, res) => {
  try {
    const measures = await db_query("SELECT * FROM tb_medida_item");

    res.json(measures);
  } catch (err) {
    console.error("Erro ao buscar measures measures", err);
    res.status(500).send("Erro ao buscar measures measures");
  }
});

router.get("/measures/:id", async (req, res) => {
  try {
    const measures = req.params.id;

    const medidasList = await db_query(
      "SELECT * FROM tb_medida_item WHERE id_medida = ?",
      [measures]
    );

    if (medidasList.length === 0) {
      res.status(404).send("Medida não encontrada");
      return;
    }

    res.json(medidasList[0]);
  } catch (err) {
    console.error("Erro ao buscar medida", err);
    res.status(500).send("Erro ao buscar medida");
  }
});

router.put("/measures/:id", async (req, res) => {
  try {
    const measures = req.params.id;
    const {ds_medida } = req.body;

    await db_query(
      "UPDATE tb_medida_item SET ds_medida = ? WHERE id_medida = ?",
      [ds_medida, measures]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar medida", err);
    res.status(500).send("Erro ao atualizar medida");
  }
});

router.delete("/measures/:id", async (req, res) => {
  try {
    const measures = req.params.id;

    await db_query("DELETE FROM tb_medida_item WHERE id_medida = ?", [measures]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar medida", err);
    res.status(500).send("Erro ao deletar medida");
  }
});

module.exports = router;
