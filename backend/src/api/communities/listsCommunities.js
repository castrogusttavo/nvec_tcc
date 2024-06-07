const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// JOIN para pegar todas as listas da comunidade
  // Tabela comunidade_listas -> listas usuários
  // Nova Tabela lista_base_comunidade -> lista base com os itens

  router.get('/listCommunities/:idCommunity', async (req, res) => {
    try {
      const idCommunity = req.params.idCommunity;

      const listsCommunity = await db_query(`
        SELECT *
        FROM 
          tb_comunidade_lista as cl
        JOIN 
          tb_lista AS l ON cl.id_lista = l.id_lista
        WHERE 
          cl.id_comunidade = ?
      `, [idCommunity])

      // Limpar a data
      const cleanedListsCommunity = listsCommunity.map(list => {
        const date = new Date(list.dt_criacao);
        const formattedDate = date.toISOString().split('T')[0];
        return { ...list, dt_criacao: formattedDate };
      });

      res.send(cleanedListsCommunity);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  router.get('/lowestList/:idCommunity', async (req, res) => {
    try {
      const idCommunity = req.params.idCommunity;

      const lowestList = await db_query(`
        SELECT *
        FROM
          tb_lista l
        JOIN
          tb_comunidade_lista cl ON l.id_lista = cl.id_lista
        WHERE
          cl.id_comunidade = ?
        ORDER BY
          vl_gasto
        LIMIT 1
      `, [idCommunity])

      // Limpar a data
      const cleanedListsCommunity = lowestList.map(list => {
        const date = new Date(list.dt_criacao);
        const formattedDate = date.toISOString().split('T')[0];
        return { ...list, dt_criacao: formattedDate };
      });

      res.send(cleanedListsCommunity);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  router.get('/items/:userId/:communityId', async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const userId = req.params.userId;

    const itemCommunity = await db_query(`
      SELECT *
      FROM 
        tb_lista_fixa li
      JOIN 
        tb_item_fixo i
      ON i.id_lista = li.id_lista
      WHERE 
        i.id_lista = ?
        AND
        li.id_lista = ?
        AND
        li.id_usuario = ?
    `, [communityId, communityId, userId]);

    console.log(itemCommunity);

    res.json(itemCommunity);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send({ error: err.message });
  }
});


router.get('/item/:idUser/:idCommunity/:idItem', async (req, res) => {
  try {
    const idCommunity = req.params.idCommunity;

    const lowestList = await db_query(`
      SELECT *
      FROM
        tb_lista l
      JOIN
        tb_comunidade_lista cl ON l.id_lista = cl.id_lista
      WHERE
        cl.id_comunidade = ?
      ORDER BY
        vl_gasto
      LIMIT 1
    `, [idCommunity])

    // Limpar a data
    const cleanedListsCommunity = lowestList.map(list => {
      const date = new Date(list.dt_criacao);
      const formattedDate = date.toISOString().split('T')[0];
      return { ...list, dt_criacao: formattedDate };
    });

    res.send(cleanedListsCommunity);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/itemsCommunity/:listId/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const listId = req.params.listId;
    const { nm_item, qtde_item,qtde_medida_item, id_medida } = req.body;

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
    
    if (qtde_medida_item) {
      setClause.push("qtde_medida_item = ?");
      setValues.push(qtde_medida_item);
    }

    // Verificar se pelo menos um campo foi enviado para atualização
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


  module.exports = router;