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

    const resultComunidade = await db_query(
      "INSERT INTO tb_comunidade (nm_comunidade, id_categoria, sb_comunidade, end_comunidade, id_criador) VALUES (?, ?, ?, ?, ?)",
      [nm_comunidade, id_categoria, sb_comunidade, end_comunidade, userId]
    );

    if (resultComunidade.affectedRows === 1) {
      const communityId = resultComunidade.insertId;

      const resultUsuario = await db_query(
        "INSERT INTO tb_comunidade_usuario (id_comunidade, id_usuario) VALUES (?, ?)",
        [communityId, userId]
      );

      if (resultUsuario.affectedRows === 1) {
        const resultList = await db_query(
          "INSERT INTO tb_lista_fixa (id_lista_fixa) VALUES (?)",
          [communityId]
        );

        if (resultList.affectedRows === 1) {
          const listId = resultList.insertId;

          const varList = await db_query(
            "INSERT INTO tb_lista_variavel (id_lista_fixa, id_usuario) VALUES (?, ?)",
            [listId, userId]
          );

          if (varList.affectedRows === 1) {
            return res.status(201).json({ id_comunidade: communityId });
          } else {
            console.error("Erro ao inserir na tabela tb_lista_variavel.");
            return res.status(500).json({ error: "Erro ao inserir na tabela tb_lista_variavel." });
          }
        } else {
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

    res.status(200).json({ message: "Comunidade atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar parcialmente a comunidade", err);
    res.sendStatus(500).send("Erro ao atualizar parcialmente a comunidade");
  }
});

// Rota DELETE para deletar uma comunidade por ID
router.delete("/communities/:idUser/:idCommunity", async (req, res) => {
  const comunidadeId = req.params.idCommunity;


    try {
      await db_query("SET FOREIGN_KEY_CHECKS = 0");

      await db_query(
        "DELETE FROM tb_item_variavel WHERE id_lista_variavel IN (SELECT id_lista_variavel FROM tb_lista_variavel WHERE id_lista_fixa = ?)",
        [comunidadeId]
      );

      await db_query(
        "DELETE FROM tb_lista_variavel WHERE id_lista_fixa = ?",
        [comunidadeId]
      );

      await db_query(
        "DELETE FROM tb_item_fixo WHERE id_lista_fixa = ?",
        [comunidadeId]
      );

      await db_query(
        "DELETE FROM tb_lista_fixa WHERE id_lista_fixa = ?",
        [comunidadeId]
      );

      await db_query(
        "DELETE FROM tb_comunidade_usuario WHERE id_comunidade = ?",
        [comunidadeId]
      );

      const resultCommunity = await db_query(
        "DELETE FROM tb_comunidade WHERE id_comunidade = ?",
        [comunidadeId]
      );

      await db_query("SET FOREIGN_KEY_CHECKS = 1");

      if (resultCommunity.affectedRows === 1) {

          res.status(204).json({ message: "Comunidade deletada com sucesso." });
    
      } else {
          res.status(404).json({ error: "Comunidade não encontrada." });
      }
    } catch (err) {
      console.error("Erro ao deletar comunidade:", err);
      res.status(500).send("Erro ao deletar comunidade.");
    }
  });


module.exports = router;
