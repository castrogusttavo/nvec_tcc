const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/lists", async (req, res) => {
  try {
    const {
      nm_lista,
      dt_criacao,
      rd_lista,
      ds_lista,
      id_categoria,
      id_usuario,
    } = req.body;

    const result = await db_query(
      "INSERT INTO tb_lista (nm_lista, dt_criacao, rd_lista, ds_lista, id_categoria, id_usuario) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nm_lista,
        new Date(dt_criacao),
        rd_lista,
        ds_lista,
        id_categoria,
        id_usuario,
      ]
    );

    res.status(201).json({ id_lista: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir lista", err);
    res.sendStatus(500).send("Erro ao inserir lista");
  }
});

router.get("/lists", async (req, res) => {
  try {
    const lists = await db_query(
      "SELECT id_lista, nm_lista, dt_criacao, rd_lista, ds_lista, id_categoria, id_usuario FROM tb_lista"
    );
    res.json(lists);
  } catch (err) {
    console.error("Erro ao buscar listas", err);
    res.sendStatus(500).send("Erro ao buscar listas");
  }
});

router.get("/lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;

    const lists = await db_query("SELECT * FROM tb_lista WHERE id_lista = ?", [
      listId,
    ]);

    if (lists.length === 0) {
      res.status(404).send("Lista não encontrada");
      return;
    }

    res.json(lists[0]);
  } catch (err) {
    console.error("Erro ao buscar lista", err);
    res.sendStatus(500).send("Erro ao buscar lista");
  }
});

router.put("/lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;
    const {
      nm_lista,
      dt_criacao,
      rd_lista,
      ds_lista,
      id_categoria,
      id_usuario,
    } = req.body;

    await db_query(
      "UPDATE tb_lista SET nm_lista = ?, dt_criacao = ?, rd_lista = ?, ds_lista = ?, id_categoria = ?, id_usuario = ? WHERE id_lista = ?",
      [
        nm_lista,
        new Date(dt_criacao),
        rd_lista,
        ds_lista,
        id_categoria,
        id_usuario,
        listId,
      ]
    );

    res.status(200).json({ message: "Lista atualizada com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar lista:", err);
    res.status(500).send("Erro ao atualizar lista");
  }
});

router.patch("/lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;
    const updateFields = req.body;

    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);

    const setQuery = keys.map((key) => `${key} = ?`).join(", ");

    await db_query(`UPDATE tb_lista SET ${setQuery} WHERE id_lista = ?`, [
      ...values,
      listId,
    ]);

    res.status(200).json({ message: "Lista atualizada com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar parcialmente a lista", err);
    res.sendStatus(500).send("Erro ao atualizar parcialmente a lista");
  }
});

router.delete("/lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;

    await db_query("DELETE FROM tb_lista WHERE id_lista = ?", [listId]);

    res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao deletar lista", err);
    res.sendStatus(500).send("Erro ao deletar lista");
  }
});

module.exports = router;
