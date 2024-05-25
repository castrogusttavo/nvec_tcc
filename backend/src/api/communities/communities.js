const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// New Community
router.post('/communities', async (req, res) => {
  try {
    const { nome_comunidade, sobre_comunidade, id_categoria, endereco_comunidade } = req.body;

    if (!nome_comunidade || !sobre_comunidade || !id_categoria || !endereco_comunidade) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const result = await db_query(
      'INSERT INTO tb_comunidade (nm_comunidade, sb_comunidade, id_categoria, end_comunidade) VALUES (?, ?, ?, ?)',
      [nome_comunidade, sobre_comunidade, id_categoria, endereco_comunidade]
    );

    res.status(200).json({
      message: 'Community created successfully.',
      id_comunidade: result.insertId,
    });
  } catch (err) {
    console.error('Error creating community:', err);
    res.status(500).send('Error creating community.');
  }
});

// Get Community by ID
router.get("/communities", async (req, res) => {
  try {
    const communities = await db_query("SELECT * FROM db_nvec.tb_comunidade;");
    
    if (communities.length === 0) {
      return res.status(404).json({ error: "No communities found." });
    }

    res.status(200).json(communities);
  } catch (err) {
    console.error("Error fetching communities:", err);
    res.status(500).send("Error fetching communities.");
  }
});

// Get Community by ID
router.get("/communities/:id", async (req, res) => {
  try {
    const communityId = req.params.id;
    const community = await db_query(
      "SELECT * FROM db_nvec.tb_comunidade WHERE id_comunidade = ?;",
      [communityId]
    );

    if (community.length === 0) {
      return res.status(404).json({ error: "Community not found." });
    }

    res.status(200).json(community[0]);
  } catch (err) {
    console.error("Error fetching community:", err);
    res.status(500).send("Error fetching community.");
  }
});

// Update All Data of Community
router.put("/communities/:id", async (req, res) => {
  try {
    const communityId = req.params.id;
    const { nome_comunidade, sobre_comunidade, id_categoria, endereco_comunidade } = req.body;

    if (!nome_comunidade || !sobre_comunidade || !id_categoria || !endereco_comunidade) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const result = await db_query(
      "UPDATE tb_comunidade SET nm_comunidade = ?, sb_comunidade = ?, id_categoria = ?, end_comunidade = ? WHERE id_comunidade = ?",
      [nome_comunidade, sobre_comunidade, id_categoria, endereco_comunidade, communityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Community not found." });
    }

    res.status(200).json({ message: "Community updated successfully." });
  } catch (err) {
    console.error("Error updating community:", err);
    res.status(500).send("Error updating community.");
  }
});

// Update Specific Data of Community
router.patch("/communities/:id", async (req, res) => {
  try {
    const communityId = req.params.id;
    const updateFields = req.body;

    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);

    const setQuery = keys.map((key, index) => `${key} = ?`).join(", ");

    const result = await db_query(
      `UPDATE tb_comunidade SET ${setQuery} WHERE id_comunidade = ?`,
      [...values, communityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Community not found." });
    }

    res.status(200).json({ message: "Community updated successfully." });
  } catch (err) {
    console.error("Error partially updating community:", err);
    res.status(500).send("Error partially updating community.");
  }
});

// Delete Community by ID
router.delete("/communities/:id", async (req, res) => {
  try {
    const communityId = req.params.id;

    const result = await db_query(
      "DELETE FROM tb_comunidade WHERE id_comunidade = ?",
      [communityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Community not found." });
    }

    res.status(200).json({ message: "Community deleted successfully." });
  } catch (err) {
    console.error("Error deleting community:", err);
    res.status(500).send("Error deleting community.");
  }
});

module.exports = router;
