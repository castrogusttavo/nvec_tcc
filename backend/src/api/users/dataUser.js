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

    const recentLists = await db_query(
      "SELECT * FROM tb_lista WHERE id_usuario = ? ORDER BY dt_criacao DESC LIMIT 4",
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
        SELECT * FROM 
          tb_comunidade_usuario AS cu
        JOIN 
          tb_comunidade AS c ON cu.id_comunidade = c.id_comunidade
        WHERE 
          cu.id_usuario = 2;
          `,
      [userId]
    );

    res.status(200).json(recentCommunities);
  } catch (err) {
    console.error("Erro ao buscar comunidades recentes:", err);
    res.status(500).send("Erro ao buscar comunidades recentes.");
  }
});

// Count User Created Communities
router.get("/createdCommunitiesCount", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "ID do usuário não fornecido" });
      return;
    }

    let createdCommunities = [];

    const communitiesCount = await db_query(
      `
      SELECT 
        COUNT(*) as communities
      FROM 
        tb_comunidade_usuario AS cu
      JOIN 
        tb_comunidade AS c ON cu.id_comunidade = c.id_comunidade
      WHERE 
        cu.id_usuario = ?
      `,
      [userId]
    );

    if (communitiesCount.length > 0) {
      createdCommunities = communitiesCount;
    }

    res.status(200).json(createdCommunities);
  } catch (err) {
    console.error("Erro ao buscar comunidades criadas", err);
    res.status(500).send("Erro ao buscar comunidades criadas");
  }
});

// Count User Login Communities
  router.get("/loginCommunitiesCount", async (req, res) => {
    try {
      const { userId } = req.query;

      if (!userId) {
        res.status(400).json({ error: "ID do usuário não fornecido" });
        return;
      }

      let loginCommunities = [];

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
        loginCommunities = communitiesCount;
      }

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
      const entriesCount = communitiesCount[0]['comunidades entradas'];
      invitationCount = entriesCount + 5;
    }

    res.status(200).json({ invitationCount });
  } catch (err) {
    console.error("Erro ao buscar convites de comunidades", err);
    res.status(500).send("Erro ao buscar convites de comunidades");
  }
});

module.exports = router;