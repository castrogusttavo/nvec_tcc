const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

module.exports = function () {
  // Criar novo item
  router.post("/items", verifyToken, async (req, res) => {
    try {
      const { nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista } = req.body;

      const result = await db_query(
        "INSERT INTO tb_item (nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista) VALUES (?, ?, ?, ?, ?, ?)",
        [nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista]
      );

      res.status(201).json({ id_item: result.insertId });
    } catch (err) {
      console.error("Erro ao inserir item", err);
      res.status(500).send("Erro ao inserir item");
    }
  });

  // Buscar todos os itens
  router.get("/items", verifyToken, async (req, res) => {
    try {
      const items = await db_query("SELECT * FROM tb_item");

      res.json(items);
    } catch (err) {
      console.error("Erro ao buscar itens", err);
      res.status(500).send("Erro ao buscar itens");
    }
  });

  // Buscar item específico pelo ID
  router.get("/items/:id", verifyToken, async (req, res) => {
    try {
      const itemId = req.params.id;

      const items = await db_query("SELECT * FROM tb_item WHERE id_item = ?", [
        itemId,
      ]);

      if (items.length === 0) {
        res.status(404).send("Item não encontrado");
        return;
      }

      res.json(items[0]);
    } catch (err) {
      console.error("Erro ao buscar item", err);
      res.status(500).send("Erro ao buscar item");
    }
  });

  // Atualizar item
  router.put("/items/:id", verifyToken, async (req, res) => {
    try {
      const itemId = req.params.id;
      const { nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista } = req.body;

      if (!nm_item || !vl_uni || !qtde_item || !id_status || !id_medida || !id_lista) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes no corpo da solicitação." });
      }

      const result = await db_query(
        "UPDATE tb_item SET nm_item = ?, vl_uni = ?, qtde_item = ?, id_status = ?, id_medida = ?, id_lista = ? WHERE id_item = ?",
        [nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista, itemId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      res.status(200).json({ message: "Item atualizado com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      if (!res.headersSent) {
        res.status(500).send("Erro ao atualizar item.");
      }
    }
  });

  // Atualizar parcialmente item
  router.patch("/items/:id", verifyToken, async (req, res) => {
    try {
      const itemId = req.params.id;
      const { nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista } = req.body;

      let setClause = [];
      let setValues = [];

      if (nm_item) {
        setClause.push("nm_item = ?");
        setValues.push(nm_item);
      }

      if (vl_uni) {
        setClause.push("vl_uni = ?");
        setValues.push(vl_uni);
      }

      if (qtde_item) {
        setClause.push("qtde_item = ?");
        setValues.push(qtde_item);
      }

      if (id_status) {
        setClause.push("id_status = ?");
        setValues.push(id_status);
      }

      if (id_medida) {
        setClause.push("id_medida = ?");
        setValues.push(id_medida);
      }

      if (id_lista) {
        setClause.push("id_lista = ?");
        setValues.push(id_lista);
      }

      if (setClause.length === 0) {
        return res.status(400).json({ error: "Nenhum campo para atualizar." });
      }

      setValues.push(itemId);

      const query = `UPDATE tb_item SET ${setClause.join(", ")} WHERE id_item = ?`;

      const result = await db_query(query, setValues);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      res.status(200).json({ message: "Item atualizado com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      res.status(500).send("Erro ao atualizar item.");
    }
  });

  // Deletar item
  router.delete("/items/:id", verifyToken, async (req, res) => {
    try {
      const itemId = req.params.id;

      const result = await db_query("DELETE FROM tb_item WHERE id_item = ?", [itemId]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Item não encontrado." });
      }

      res.sendStatus(200);
    } catch (err) {
      console.error("Erro ao deletar item", err);
      res.status(500).send("Erro ao deletar item");
    }
  });

  return router;
};
