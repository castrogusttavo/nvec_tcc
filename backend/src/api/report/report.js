const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// Total Gasto
  // vl_gasto por lista + id_ctg 
  // 4 categorias que mais gastou

  router.get('/report/totalSpend/', async (req, res) => {
    try {
      const { userId } = req.query; // Alteração aqui
  
      const spend = await db_query(`
        SELECT 
          c.ds_categoria,
          SUM(l.vl_gasto) as total_gasto
        FROM
          tb_lista l
        JOIN
          tb_categoria c ON l.id_categoria = c.id_categoria
        WHERE
          l.id_usuario = ?
        GROUP BY
          c.ds_categoria
        ORDER BY
          total_gasto DESC
        LIMIT 4
    `, [userId]);
  
      res.json(spend);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Total Economizado
  // vl_total - vl_gasto + id_ctg
  // 4 categorias que mais economizou

  router.get('/report/totalSaved/', async (req, res) => {
    try {
      const { userId } = req.query; // Alteração aqui
  
      const saved = await db_query(`
        SELECT
          c.ds_categoria,
          COALESCE(SUM(l.rd_lista - l.vl_gasto), 0) as total_economizado
        FROM
          tb_lista l
        JOIN
          tb_categoria c ON l.id_categoria = c.id_categoria
        WHERE
          l.id_usuario = ?
        GROUP BY
          c.ds_categoria
        ORDER BY
          total_economizado DESC
        LIMIT 4
      `, [userId]);
      
      res.json(saved);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Balanço geral
  // Listas Criadas pelo Usuário
  // Comparações feitas
  // Listas Finalizadas

  router.get('/report/balance/', async (req, res) => {
    try {
      const { userId } = req.query;
      console.log('UserID:', userId);

      const createdLists = await db_query(`
        SELECT 
        COUNT(*) as lists_created
        FROM
          tb_lista
        WHERE
          id_usuario = ?
      `, [userId]);

      const communities = await db_query(`
      SELECT 
      COUNT(*) as communities
      FROM 
        tb_comunidade_usuario AS cu
      JOIN 
        tb_comunidade AS c 
        ON cu.id_comunidade = c.id_comunidade;
      `, [userId])

      const completedLists = await db_query(`
        SELECT
        COUNT(*) as lists_completed
        FROM
          tb_lista
        WHERE
          id_usuario = ?
        AND (rd_lista - vl_gasto) = 0
      `, [userId]);

      res.status(200).json({
        createdList: { lists_created: createdLists[0].lists_created },
        completedLists: { lists_completed: completedLists[0].lists_completed },
        communities: { communities: communities[0].communities }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

  module.exports = router;