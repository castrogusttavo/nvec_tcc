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

  module.exports = router;