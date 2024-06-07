const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/staticItems", async (req, res) => {
  try {
    const { nm_item,qtde_item,id_medida,qtde_medida,id_lista } = req.body;

    const result = await db_query(
        "INSERT INTO tb_item_fixo (nm_item,qtde_item,qtde_medida, id_medida, id_lista) VALUES (?, ?, ?, ?, ?)",
        [nm_item,qtde_item,qtde_medida,id_medida,id_lista]
      );

    res.status(201).json({ id_item: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir item", err);
    res.sendStatus(500).send("Erro ao inserir item");
  }
});

router.get("/staticItems/:listId", async (req, res) => {
  try {
    const listId=req.params.listId;
    const items = await db_query("SELECT * FROM tb_item_fixo where id_lista=?",
      [listId]
    );

    res.json(items);
  } catch (err) {
    console.error("Erro ao buscar itens", err);
    res.sendStatus(500).send("Erro ao buscar itens");
  }
});

router.get("/staticItems/:listId/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const listId = req.params.listId;

    const items = await db_query(
        "SELECT * FROM tb_item_fixo WHERE id_item = ? AND id_lista=?",
        [itemId, listId]
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

router.put("/staticItems/:listId/:itemId", async (req, res) => {
  try {
    const itemId = req.params.id;
    const { nm_item,qtde_item,qtde_medida,id_medida, id_lista } = req.body;

    if (!nm_item || !qtde_item || !qtde_medida|| !id_medida || !id_lista) {
      return res.status(400).json({
        error: "Campos obrigatórios ausentes no corpo da solicitação.",
      });
    }

    const result = await db_query(
      "UPDATE tb_item SET nm_item = ?, qtde_item = ?,qtde_medida=?, id_medida = ?, id_lista = ? WHERE id_item = ?",
      [nm_item,qtde_item,qtde_medida,id_medida, id_lista, itemId]
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

router.patch("/staticItems/:listId/:itemId", async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemId = req.params.itemId;
    const { nm_item, qtde_item,qtde_medida, id_medida } = req.body;

    // Criar a query dinamicamente, com base nos campos enviados
    let setClause = [];
    let setValues = [];

    if (nm_item) {
      setClause.push("nm_item = ?");
      setValues.push(nm_item);
    }

    if (qtde_item) {
      setClause.push("qtde_item = ?");
      setValues.push(qtde_item);
    }

    if (id_medida) {
      setClause.push("id_medida = ?");
      setValues.push(id_medida);
    }
    
    if (qtde_medida) {
      setClause.push("qtde_medida = ?");
      setValues.push(qtde_medida);
    }

    if (setClause.length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar." });
    }

    setValues.push(itemId);

    const query = `UPDATE tb_item_fixo SET ${setClause.join(", ")} WHERE id_item = ? AND id_lista=?`;

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

router.delete("/staticItems/:listId/:itemId", async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemId = req.params.itemId;

    await db_query("DELETE FROM tb_item_fixo WHERE id_item = ? AND id_lista=?", [itemId,listId]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar item", err);
    res.sendStatus(500).send("Erro ao deletar item");
  }
});

module.exports = router;