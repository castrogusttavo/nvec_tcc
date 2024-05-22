const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

module.exports = function () {
  // New Item
  router.post("/items/:id", async (req, res) => {
    const id_lista = req.params.id;
    try {
      const {
        nome_item,
        valor_unidade,
        quantidade_item,
        id_status,
        id_medida,
      } = req.body;

      const result = await db_query(
        "INSERT INTO tb_item (nm_item, vl_unidade, qt_item, id_status, id_medida, id_lista) VALUES (?, ?, ?, ?, ?, ?)",
        [
          nome_item,
          valor_unidade,
          quantidade_item,
          id_status,
          id_medida,
          id_lista,
        ]
      );

      res
        .status(201)
        .json({
          message: "Item criado com sucesso.",
          id_item: result.insertId,
        });
    } catch (err) {
      console.error("Erro ao criar item:", err);
      res.status(500).send("Erro ao criar item.");
    }
  });

  // Get All Items
  router.get("/items", async (req, res) => {
    try {
      const item = await db_query("SELECT * FROM tb_item");

      res.json(item);
    } catch (err) {
      console.error("Erro ao buscar itens:", err);
      res.status(500).send("Erro ao buscar itens.");
    }
  });

  // Get Item by ListID
  router.get("/itemsByList/:id", async (req, res) => {
    try {
      const listId = req.params.id;

      const items = await db_query("SELECT * FROM tb_item WHERE id_lista = ?", [
        listId,
      ]);

      res.json(items);
    } catch (err) {
      console.error("Erro ao buscar itens da Lista:", err);
      res.status(500).send("Erro ao buscar itens da Lista.");
    }
  });

  // Get Item by ID and ListID
  router.get("/itemsByID/:id_lista/:id", async (req, res) => {
    try {
      const listId = req.params.id_lista;
      const itemId = req.params.id;

      const item = await db_query(
        "SELECT * FROM tb_item WHERE id_item = ? AND id_lista = ?",
        [itemId, listId]
      );

      res.json(item);
    } catch (err) {
      console.error("Erro ao buscar item:", err);
      res.status(500).send("Erro ao buscar item.");
    }
  });

  // Alter All Data of Item
  router.put("/items/:id_lista/:id", async (req, res) => {
    try {
      const itemId = req.params.id;
      const listId = req.params.id_lista;
      const {
        nome_item,
        valor_unidade,
        quantidade_item,
        id_status,
        id_medida,
      } = req.body;

      if (
        !nome_item ||
        !valor_unidade ||
        !quantidade_item ||
        !id_status ||
        !id_medida
      ) {
        return res.status(400).json({
          error: "Campos obrigatórios ausentes no corpo da solicitação.",
        });
      }

      const result = await db_query(
        "UPDATE tb_item SET nm_item = ?, vl_unidade = ?, qt_item = ?, id_status = ?, id_medida = ?, id_lista = ? WHERE id_item = ? AND id_lista = ?",
        [
          nome_item,
          valor_unidade,
          quantidade_item,
          id_status,
          id_medida,
          listId,
          itemId,
          listId,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      res.status(200).json({ message: "Item atualizado com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      res.status(500).send("Erro ao atualizar item.");
    }
  });

  // Alter Specific Data of Item
  router.patch("/items/:id_lista/:id", async (req, res) => {
    try {
      const itemId = req.params.id;
      const listId = req.params.id_lista;
      const updateFields = req.body;

      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);

      const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");

      await db_query(
        `UPDATE tb_item SET ${setQuery} WHERE id_item = ? AND id_lista = ?`,
        [...values, itemId, listId]
      );

      res.status(200).json({ message: "Item atualizado com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar parcialmente o item", err);
      res.status(500).send("Erro ao atualizar parcialmente o item.");
    }
  });

  // Delete Item by ID and ListID
  router.delete("/items/:id_lista/:id", async (req, res) => {
    try {
      const itemId = req.params.id;
      const listId = req.params.id_lista;

      const result = await db_query(
        "DELETE FROM tb_item WHERE id_item = ? AND id_lista = ?",
        [itemId, listId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      res.status(200).json({ message: "Item deletado com sucesso." });
    } catch (err) {
      console.error("Erro ao deletar item:", err);
      res.status(500).send("Erro ao deletar item.");
    }
  });

  return router;
};
