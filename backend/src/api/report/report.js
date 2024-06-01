const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// Total Gasto
// vl_gasto por lista + id_ctg
// 4 categorias que mais gastou
router.get("/report/totalSpend/", async (req, res) => {
  try {
    const { userId } = req.query;

    const spend = await db_query(
      `
      SELECT 
        c.ds_categoria,
        COALESCE(SUM(COALESCE(i.vl_uni * i.qtde_item, 0)), 0) AS total_gasto
      FROM
        vw_relatorio v
      JOIN
        tb_lista l ON v.listId = l.id_lista
      JOIN
        tb_categoria c ON l.id_categoria = c.id_categoria
      WHERE
        v.userId = ?
      GROUP BY
        c.ds_categoria
      ORDER BY
        total_gasto DESC
      LIMIT 4
    `,
      [userId]
    );

    res.json(spend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Total Economizado
// vl_total - vl_gasto + id_ctg
// 4 categorias que mais economizou
router.get("/report/totalSaved/", async (req, res) => {
  try {
    const { userId } = req.query;

    const saved = await db_query(
      `
        SELECT
          c.ds_categoria,
          COALESCE(SUM(l.rd_lista - (i.vl_uni * i.qtde_item)), 0) as total_economizado
        FROM
          vw_relatorio v
        JOIN
          tb_lista l ON v.listId = l.id_lista
        JOIN
          tb_categoria c ON l.id_categoria = c.id_categoria
        WHERE
          v.userId = ?
        GROUP BY
          c.ds_categoria
        ORDER BY
          total_economizado DESC
        LIMIT 4
      `,
      [userId]
    );

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Balanço geral
// Listas Criadas pelo Usuário
// Comparações feitas
// Listas Finalizadas
router.get("/report/balance/", async (req, res) => {
  try {
    const { userId } = req.query;

    const createdLists = await db_query(
      `
        SELECT 
        COUNT(*) as lists_created
        FROM
          tb_lista
        WHERE
          id_usuario = ?
      `,
      [userId]
    );

    const communities = await db_query(
      `
      SELECT 
        COUNT(*) as communities
      FROM 
        tb_comunidade_usuario AS cu
      JOIN 
        tb_comunidade AS c 
        ON cu.id_comunidade = c.id_comunidade
      WHERE
        cu.id_usuario = ?;
      `,
      [userId]
    );

    const completedLists = await db_query(
      `
        SELECT
        COUNT(*) as lists_completed
        FROM
          tb_lista l
        JOIN
          vw_relatorio v ON l.id_lista = v.listId
        WHERE
          l.id_usuario = ?
        AND (l.rd_lista - (v.item * v.quantidade)) = 0
      `,
      [userId]
    );

    res.status(200).json({
      createdList: { lists_created: createdLists[0].lists_created },
      completedLists: { lists_completed: completedLists[0].lists_completed },
      communities: { communities: communities[0].communities },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Valor Total das listas por categoria
router.get("/report/totalValueByCategory/", async (req, res) => {
  try {
    const { userId } = req.query;

    const totalValueByCategory = await db_query(
      `
        SELECT 
        c.ds_categoria,
        SUM(l.rd_lista) as total_rendas
      FROM
        tb_lista l
      JOIN
        tb_categoria c ON l.id_categoria = c.id_categoria
      WHERE
        l.id_usuario = ?
      GROUP BY
        c.ds_categoria
      ORDER BY
        total_rendas DESC
      LIMIT 4
      `,
      [userId]
    );

    res.json(totalValueByCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
