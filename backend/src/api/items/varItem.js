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
        `UPDATE tb_lista_variavel SET ${setQuery} WHERE id_lista_variavel = ? AND id_lista_fixa=? AND id_usuario = ?`,
        [...values, listId, communityId, userId]
      );

  
      res.status(200).json({ message: "Lista atualizada com sucesso." });
    } catch (err) {
      console.error("Erro ao atualizar lista:", err);
      res.status(500).send("Erro ao atualizar lista.");
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

  router.get('/create-item/:communityId/:userId', async (req, res) => {
    const { communityId, userId } = req.params;
  
    try {

      const usuario_comunidade = await db_query(
        'SELECT * FROM tb_comunidade_usuario WHERE id_comunidade = ? AND id_usuario = ?',
        [communityId, userId]
      );
      
      if (usuario_comunidade.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado na comunidade' });
      }
      
      const item_fixo = await db_query(
        'SELECT id_item_fixo FROM tb_item_fixo WHERE id_lista_fixa = ?',
        [communityId]
      );
      
      for (const item of item_fixo) {
        const itemId = item.id_item_fixo;
      
        const lista_variavel = await db_query(
          'SELECT * FROM tb_lista_variavel WHERE id_usuario = ?',
          [userId]
        );
      
        for (const lista of lista_variavel) {
          const item_variavel = await db_query(
            'SELECT * FROM tb_item_variavel WHERE id_lista_variavel = ? AND id_item_fixo = ?',
            [lista.id_lista_variavel, itemId]
          );
      
          if (item_variavel.length === 0) {
            await db_query(
              'INSERT INTO tb_item_variavel (id_lista_variavel, id_item_fixo, vl_uni) VALUES (?, ?, NULL)',
              [lista.id_lista_variavel, itemId]
            );
          }
        }
      }
          
      res.status(200).json({ message: 'Itens variáveis atualizados para o usuário na comunidade' });
    } catch (error) {
      console.error('Erro ao acessar a comunidade:', error);
      res.status(500).json({ error: 'Erro ao acessar a comunidade' });
    }
  });



  module.exports = router;