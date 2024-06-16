const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/lists", async (req, res) => {
  try {
    const { nm_lista, rd_lista, ds_lista, id_categoria, id_usuario, end_lista } = req.body;

    const result = await db_query(
      "INSERT INTO tb_lista (nm_lista, rd_lista, ds_lista, id_categoria,end_lista, id_usuario) VALUES (?, ?, ?, ?, ?,?)",
      [nm_lista, rd_lista, ds_lista, id_categoria,end_lista, id_usuario]
    );

    res.status(201).json({ id_lista: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir lista", err);
    res.sendStatus(500).send("Erro ao inserir lista");
  }
});

router.get("/lists", async (req, res) => {
  try {
    const userId = req.query.userId;
    const lists = await db_query("SELECT * FROM tb_lista where id_usuario=?",
      [userId]
    );
    res.json(lists);
  } catch (err) {
    console.error("Erro ao buscar listas", err);
    res.sendStatus(500).send("Erro ao buscar listas");
  }
});

router.get('/recentLists', async (req, res) => {
  try {
    const userId = req.query.userId;
    const recentLists = await db_query(
      "SELECT * FROM tb_lista where id_usuario=? ORDER BY dt_criacao ASC LIMIT 4",
      [userId]
    );

    res.status(200).json(recentLists);
  } catch(err) {
    console.error("Erro ao buscar listas recentes", err);
    res.status(500).send("Erro ao buscar listas recentes");
  }
});

router.get("/list/:id", async (req, res) => {
  try {
    const listId = req.params.id;

    const lists = await db_query(`SELECT 
    l.*,
    (SELECT SUM(i.vl_uni * i.qtde_item) 
     FROM tb_item i 
     WHERE i.id_lista = l.id_lista AND i.id_status = 2) AS vl_gasto
FROM 
    tb_lista l
WHERE 
    l.id_lista = ?;`, [listId]);

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
    const { nm_lista, rd_lista, ds_lista, id_categoria, id_usuario } = req.body;

    if (
      nm_lista === undefined ||
      ds_lista === undefined ||
      id_categoria === undefined ||
      rd_lista === undefined ||
      id_usuario === undefined
    ) {
      res.status(400).send("Um ou mais valores estão ausentes");
      return;
    }

    await db_query(
      "UPDATE tb_lista SET nm_lista = ?, ds_lista = ?, id_categoria = ?, rd_lista=?, id_usuario = ? WHERE id_lista = ?",
      [nm_lista, ds_lista, id_categoria,rd_lista, id_usuario, listId]
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

    const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");
    
    await db_query(
      `UPDATE tb_lista SET ${setQuery} WHERE id_lista = ?`,
      [...values, listId]
    );

    res.status(200).json({ message: "Item atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar parcialmente a lista", err);
    res.sendStatus(500).send("Erro ao atualizar parcialmente a lista");
  }
});

router.delete("/lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;

    await db_query("DELETE FROM tb_item WHERE id_lista = ?", [listId]);
    await db_query("DELETE FROM tb_lista WHERE id_lista = ?", [listId]);

    res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao deletar lista", err);
    res.sendStatus(500).send("Erro ao deletar lista");
  }
});

router.get("/lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await db_query(
      `SELECT * FROM tb_lista WHERE id_lista = ?`,
      [listId]
    );

    if (list.length === 0) {
      res.status(404).send("Lista não encontrada");
      return;
    }

    res.json(list[0]);
  } catch (err) {
    console.error("Erro ao buscar lista", err);
    res.status(500).send("Erro ao buscar lista");
  }
});

module.exports = router;
