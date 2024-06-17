const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// Recent Lists
router.get("/recentListUser", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "ID do usuário não fornecido" });
      return;
    }

    const recentLists = await db_query(`
    SELECT 
      l.id_lista,
      l.nm_lista,
      l.dt_criacao,
      l.ds_lista,
      l.rd_lista,
      l.end_lista,
      l.id_categoria,
      l.id_usuario,
      (SELECT SUM(i.vl_uni * i.qtde_item) 
    FROM tb_item i 
      WHERE i.id_lista = l.id_lista AND i.id_status = 2) AS vl_gasto
    FROM 
      tb_lista l
    WHERE 
      l.id_usuario = ?
    ORDER BY 
      l.dt_criacao DESC, 
      l.id_lista DESC
    LIMIT 4;
      `,
      [userId]
    );

    res.status(200).json(recentLists);
  } catch (err) {
    console.error("Erro ao buscar listas recentes", err);
    res.status(500).send("Erro ao buscar listas recentes");
  }
});

// Recent Communities
router.get("/recentCommunitiesUser", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "ID do usuário não fornecido" });
      return;
    }

    const recentCommunities = await db_query(
      `
      SELECT 
        *
      FROM 
        tb_comunidade_usuario AS cu
      JOIN 
        tb_comunidade AS c ON cu.id_comunidade = c.id_comunidade
      JOIN 
        tb_categoria AS cat ON c.id_categoria = cat.id_categoria
      WHERE 
        cu.id_usuario = ?
      ORDER BY
        c.dt_criacao DESC
      LIMIT 4
          `,
      [userId]
    );

    res.status(200).json(recentCommunities);
  } catch (err) {
    console.error("Erro ao buscar comunidades recentes:", err);
    res.status(500).send("Erro ao buscar comunidades recentes.");
  }
});

router.get("/createdCommunitiesCount", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const communitiesCount = await db_query(
      `
      SELECT 
        COUNT(*) as count
      FROM 
        tb_comunidade AS c
      JOIN tb_comunidade_usuario AS cu
      ON c.id_comunidade = cu.id_comunidade
      WHERE cu.id_usuario=? AND c.id_criador = cu.id_usuario
      `,
      [userId]
    );

    const createdCommunitiesCount =
      communitiesCount.length > 0 ? communitiesCount[0].count : 0;

    res.status(200).json(createdCommunitiesCount);
  } catch (err) {
    console.error("Erro ao buscar comunidades criadas", err);
    res.status(500).send("Erro ao buscar comunidades criadas");
  }
});

router.get("/loginCommunitiesCount", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const communitiesCount = await db_query(
      `
      SELECT 
        COUNT(*) as count
      FROM 
        tb_comunidade AS c
      JOIN tb_comunidade_usuario AS cu
      ON c.id_comunidade = cu.id_comunidade
      WHERE cu.id_usuario=? AND c.id_criador != cu.id_usuario
      `,
      [userId]
    );

    const loginCommunities =
      communitiesCount.length > 0 ? communitiesCount[0].count : 0;

    res.status(200).json(loginCommunities);
  } catch (err) {
    console.error("Erro ao buscar comunidades acessadas", err);
    res.status(500).send("Erro ao buscar comunidades acessadas");
  }
});

// Count User Invitations
router.get("/invitationCommunitiesCount", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "ID do usuário não fornecido" });
      return;
    }

    let invitationCount = 0;

    const communitiesCount = await db_query(
      `
      SELECT 
        COUNT(*) as 'comunidades entradas'
      FROM 
        tb_comunidade AS c
      WHERE 
        NOT EXISTS (
          SELECT 1
          FROM tb_comunidade_usuario AS cu
          WHERE cu.id_usuario = ? AND cu.id_comunidade = c.id_comunidade
        );
      `,
      [userId]
    );

    if (communitiesCount.length > 0) {
      const entriesCount = communitiesCount[0]["comunidades entradas"];
      invitationCount = entriesCount + 5;
    }

    res.status(200).json({ invitationCount });
  } catch (err) {
    console.error("Erro ao buscar convites de comunidades", err);
    res.status(500).send("Erro ao buscar convites de comunidades");
  }
});

module.exports = router;
