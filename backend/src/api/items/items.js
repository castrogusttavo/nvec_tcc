const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/items", async (req, res) => {
  try {
    const { nm_item, vl_uni, id_status, id_lista } = req.body;

    const result = await db_query(
        "INSERT INTO tb_item (nm_item, vl_uni, id_status, id_lista) VALUES (?, ?, ?, ?) RETURNING *",
        [nm_item, vl_uni, id_status, id_lista]
      );

    res.status(201).json({ id_item: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir item", err);
    res.sendStatus(500).send("Erro ao inserir item");
  }
});

router.get("/items", async (req, res) => {
  try {
    const items = await db_query("SELECT * FROM tb_item");

    res.json(items);
  } catch (err) {
    console.error("Erro ao buscar itens", err);
    res.sendStatus(500).send("Erro ao buscar itens");
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const items = await db_query(
        "SELECT * FROM tb_item WHERE id_item = ?",
        [itemId]
      );

    if (items.length === 0) {
      res.status(404).send("Item não encontrado");
      return;
    }

    res.json(items[0]);
  } catch (err) {
    console.error("Erro ao buscar item", err);
    res.sendStatus(500).send("Erro ao buscar item");
  }
});

router.put("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const { nm_item, vl_uni, id_status, id_lista } = req.body;

    await db_query(
        "UPDATE tb_item SET nm_item = ?, vl_uni = ?, id_status = ?, id_lista = ? WHERE id_item = ?",
        [nm_item, vl_uni, id_status, id_lista, itemId]
      );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar item", err);
    res.sendStatus(500).send("Erro ao atualizar item");
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    await db_query("DELETE FROM tb_item WHERE id_item = ?", [itemId]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar item", err);
    res.sendStatus(500).send("Erro ao deletar item");
  }
});

module.exports = router;