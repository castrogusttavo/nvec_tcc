const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// Total Gasto Semestral
router.get("/reportSemester/totalSpend/", async (req, res) => {
  try {
    const { userId } = req.query;

    const spend = await db_query(
      `
      SELECT
        c.ds_categoria,
        COALESCE(SUM(COALESCE(r.vl_uni * r.qtde_item, 0)), 0) AS total_gasto
      FROM
        vw_relatorio r
      JOIN
        tb_lista l ON r.id_lista = l.id_lista
      JOIN
        tb_categoria c ON l.id_categoria = c.id_categoria
      WHERE
        r.id_usuario = ?
        AND l.dt_criacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
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

// Total Economizado Semestral
router.get("/reportSemester/totalSaved/", async (req, res) => {
  try {
    const { userId } = req.query;

    const saved = await db_query(
      `
      SELECT
        c.ds_categoria,
        COALESCE(SUM(l.rd_lista - (r.vl_uni * r.qtde_item)), 0) AS total_economizado
      FROM
        vw_relatorio r
      JOIN
        tb_lista l ON r.id_lista = l.id_lista
      JOIN
        tb_categoria c ON l.id_categoria = c.id_categoria
      WHERE
        r.id_usuario = ?
        AND l.dt_criacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
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

// Balanço geral Semestral
router.get("/reportSemester/balance/", async (req, res) => {
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
        AND dt_criacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
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
        cu.id_usuario = ?
      `,
      [userId]
    );

    const completedLists = await db_query(
      `
      SELECT
        COUNT(*) as lists_completed
      FROM
        tb_lista l
      WHERE
        l.id_usuario = ?
        AND (l.rd_lista - (SELECT SUM(i.vl_uni * i.qtde_item) FROM tb_item i WHERE i.id_lista = l.id_lista AND i.id_status = 2)) <= 0
        AND l.dt_criacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
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

// Valor Total das listas por categoria Semestral
router.get("/reportSemester/totalValueByCategory/", async (req, res) => {
  try {
    const { userId } = req.query;

    const totalValueByCategory = await db_query(
      `
      SELECT 
        c.ds_categoria,
        SUM(l.rd_lista) as total_rendas
      FROM
        vw_relatorio r
      JOIN
        tb_lista l ON r.id_lista = l.id_lista
      JOIN
        tb_categoria c ON l.id_categoria = c.id_categoria
      WHERE
        r.id_usuario = ?
        AND l.dt_criacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
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
