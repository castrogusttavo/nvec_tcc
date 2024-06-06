const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/communities", async (req, res) => {
  try {
    const { nm_comunidade, id_categoria, sb_comunidade, end_comunidade, userId } = req.body;

    if (!nm_comunidade || !id_categoria || !sb_comunidade || !end_comunidade || !userId) {
      console.error("Campos obrigatórios ausentes.");
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const result = await db_query(
      "INSERT INTO tb_comunidade (nm_comunidade, id_categoria, sb_comunidade, end_comunidade) VALUES (?, ?, ?, ?)",
      [nm_comunidade, id_categoria, sb_comunidade, end_comunidade]
    );

    console.log("inserção na tb_comunidade:", result);

    const communityId = result.insertId;

    if (result.affectedRows === 1) {
      const userCommunityResult = await db_query(
        "INSERT INTO tb_comunidade_usuario (id_comunidade, id_usuario) VALUES (?, ?)",
        [communityId, userId]
      );

      console.log("inserção na tb_comunidade_usuario:", userCommunityResult);

      if (userCommunityResult.affectedRows === 1) {

        const resultList = await db_query(
          "INSERT INTO tb_lista_fixa (id_lista,id_usuario) VALUES (?,?)",
          [communityId,userId]
        );

        console.log("inserção na tb_lista_fixa:", resultList);

        if (resultList.affectedRows === 1) {
          return res.status(201).json({ id_comunidade: communityId });
        } else{
          console.error("Erro ao inserir na tabela tb_lista_fixa.");
          return res.status(500).json({ error: "Erro ao inserir na tabela tb_lista_fixa." });  
        }

      } else {
        console.error("Erro ao inserir na tabela tb_comunidade_usuario.");
        return res.status(500).json({ error: "Erro ao inserir na tabela tb_comunidade_usuario." });
      }
    } else {
      console.error("Erro ao inserir na tabela tb_comunidade.");
      return res.status(500).json({ error: "Erro ao inserir na tabela tb_comunidade." });
    }
  } catch (err) {
    console.error("Erro ao inserir comunidade:", err);
    return res.status(500).send("Erro ao inserir comunidade.");
  }
});

router.post("/communities/:userId/:communityId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const communityId = req.params.communityId;

    const { nm_item, id_medida, qtde_item } = req.body;

    if (!nm_item || !id_medida || !qtde_item  ) {
      console.error("Campos obrigatórios ausentes.");
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const result = await db_query(
      "INSERT INTO tb_item_fixo (nm_item, id_medida, qtde_item, id_lista) VALUES (?, ?, ?, ?)",
      [nm_item, id_medida, qtde_item, communityId]
    );

    console.log("inserção na tb_item_fixo:", result);

  } catch (err) {
    console.error("Erro ao inserir comunidade:", err);
    return res.status(500).send("Erro ao inserir comunidade.");
  }
});

// router.get('/recentCommunities', async (req, res) => {
//   try {
//     const recentCommunities = await db_query(
//       "SELECT * FROM tb_comunidade ORDER BY dt_criacao ASC LIMIT 4"
//     );

//     res.status(200).json(recentCommunities);
//   } catch(err) {
//     console.error("Erro ao buscar comunidades recentes", err);
//     res.status(500).send("Erro ao buscar comunidades recentes");
//   }
// });

// Rota GET para buscar todas as comunidades
router.get("/communities", async (req, res) => {
  try {
    const userId=req.query.userId;

    const comunidades = await db_query("SELECT * FROM tb_comunidade c JOIN tb_comunidade_usuario cu ON c.id_comunidade = cu.id_comunidade WHERE cu.id_usuario=?",
      [userId]
    );
    res.json(comunidades);
  } catch (err) {
    console.error("Erro ao buscar comunidades:", err);
    res.status(500).send("Erro ao buscar comunidades.");
  }
});

// Rota GET para buscar uma comunidade por ID
router.get("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;

    const comunidades = await db_query(
      "SELECT * FROM tb_comunidade WHERE id_comunidade = ?",
      [comunidadeId]
    );

    if (comunidades.length === 0) {
      return res.status(404).json({ error: "Comunidade não encontrada." });
    }

    res.json(comunidades[0]);
  } catch (err) {
    console.error("Erro ao buscar comunidade:", err);
    res.status(500).send("Erro ao buscar comunidade.");
  }
});

// Rota PUT para atualizar uma comunidade por ID
router.put("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;
    const { nm_comunidade, id_categoria, sb_comunidade, end_comunidade } = req.body;

    if (!nm_comunidade || !id_categoria || !sb_comunidade || !end_comunidade) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const result = await db_query(
      "UPDATE tb_comunidade SET nm_comunidade = ?, id_categoria = ?, sb_comunidade=?, end_comunidade=? WHERE id_comunidade = ?",
      [nm_comunidade, id_categoria, sb_comunidade, end_comunidade, comunidadeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Comunidade não encontrada." });
    }

    res.status(200).json({ message: "Comunidade atualizada com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar comunidade:", err);
    res.status(500).send("Erro ao atualizar comunidade.");
  }
});

router.patch("/communities/:id", async (req, res) => {
  try {
    const comunidadeId = req.params.id;
    const updateFields = req.body;

    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);

    const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");
    
    await db_query(
      `UPDATE tb_comunidade SET ${setQuery} WHERE id_comunidade = ?`,
      [...values, comunidadeId]
    );

    res.status(200).json({ message: "Item atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar parcialmente a lista", err);
    res.sendStatus(500).send("Erro ao atualizar parcialmente a lista");
  }
});

// Rota DELETE para deletar uma comunidade por ID
router.delete("/communities/:idUser/:idCommunity", async (req, res) => {
  try {
    const comunidadeId = req.params.idCommunity;
    const userId = req.params.idUser;

    const result = await db_query("DELETE FROM tb_comunidade_usuario WHERE id_comunidade = ? AND id_usuario=?",
     [comunidadeId, userId]);

     console.log("delete tb_comunidade_usuario: ", result);

     if(result.affectedRows===1){
      const resultCommunity = await db_query("DELETE FROM tb_comunidade WHERE id_comunidade = ?", [comunidadeId]);

      console.log("delete tb_comunidade: ",resultCommunity)
      if (resultCommunity.affectedRows===1) {
        res.status(204).json({ message: "Comunidade deletada com sucesso." });
      } else{
        return res.status(404).json({ error: "Comunidade não encontrada." });
      }
    }

  } catch (err) {
    console.error("Erro ao deletar comunidade:", err);
    res.status(500).send("Erro ao deletar comunidade.");
  }
});


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

module.exports = router;
