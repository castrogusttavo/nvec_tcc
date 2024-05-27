const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/status", async (req, res) => {
  try {
    const { ds_status,ic_status } = req.body;

    const result = await db_query(
      "INSERT INTO tb_status (ds_status,ic_status) VALUES (?,?) RETURNING *",
      [ds_status,ic_status]
    );

    res.status(201).json({ id_status: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir statu", err);
    res.status(500).send("Erro ao inserir statu");
  }
});

router.get("/status", async (req, res) => {
  try {
    const status = await db_query("SELECT * FROM tb_status");

    res.json(status);
  } catch (err) {
    console.error("Erro ao buscar status status", err);
    res.status(500).send("Erro ao buscar status status");
  }
});

router.get("/status/:id", async (req, res) => {
  try {
    const status = req.params.id;

    const statusList = await db_query(
      "SELECT * FROM tb_status WHERE id_status = ?",
      [status]
    );

    if (statusList.length === 0) {
      res.status(404).send("status status não encontrada");
      return;
    }

    res.json(statusList[0]);
  } catch (err) {
    console.error("Erro ao buscar status", err);
    res.status(500).send("Erro ao buscar status");
  }
});

router.put("/status/:id", async (req, res) => {
  try {
    const status = req.params.id;
    const {ds_status } = req.body;

    await db_query(
      "UPDATE tb_status SET ds_status = ? WHERE id_status = ?",
      [ds_status, status]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar statu", err);
    res.status(500).send("Erro ao atualizar statu");
  }
});

router.delete("/status/:id", async (req, res) => {
  try {
    const status = req.params.id;

    await db_query("DELETE FROM tb_status WHERE id_status = ?", [status]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar statu", err);
    res.status(500).send("Erro ao deletar statu");
  }
});

module.exports = router;
