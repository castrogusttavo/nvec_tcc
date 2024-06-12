const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");


router.patch("/varItem/:userId/:communityId/:listId/:itemId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const listId = req.params.listId;
      const communityId = req.params.communityId;
      const itemId = req.params.itemId;

      const updateFields = req.body;

      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);
  
      const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");
      
      await db_query(
        `UPDATE tb_item_variavel SET ${setQuery} WHERE id_item_variavel = ?`,
        [...values, itemId]
      );
    
  
      res.status(200).json({ message: "Item atualizado com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      res.status(500).send("Erro ao atualizar item.");
    }
  });

router.patch("/varItemLocal/:userId/:communityId/:listId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const listId = req.params.listId;
      const communityId = req.params.communityId;
      const itemId = req.params.itemId;

      const updateFields = req.body;

      const keys = Object.keys(updateFields);
      const values = Object.values(updateFields);
  
      const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");
      
      await db_query(
        `UPDATE tb_lista_variavel SET ${setQuery} WHERE id_lista_variavel = ?`,
        [...values, listId]
      );
    
  
      res.status(200).json({ message: "Item atualizado com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      res.status(500).send("Erro ao atualizar item.");
    }
  });


  router.get("/varItem/:communityId/:listId/:itemId", async (req, res) => {
    try {
      const itemId = req.params.itemId;
      const listId = req.params.listId;
      const communityId = req.params.communityId;
  
      const items = await db_query(
          "SELECT iv.*, ifx.*, iv.vl_uni * ifx.qtde_item AS total FROM tb_item_variavel iv JOIN tb_item_fixo ifx ON iv.id_item_fixo = ifx.id_item_fixo WHERE ifx.id_lista_fixa = ? AND iv.id_lista_variavel = ? AND iv.id_item_variavel = ?",
          [communityId,listId,itemId]
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



  module.exports = router;