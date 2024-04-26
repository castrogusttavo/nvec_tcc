const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.post("/fixedExpenses", async (req, res) => {
  try {
    const { vl_despesa_fixa, ds_despesa_fixa, id_usuario } = req.body;

    const result = await db_query(
      "INSERT INTO tb_despesa_fixa (vl_despesa_fixa, ds_despesa_fixa, id_usuario) VALUES (?, ?, ?) RETURNING *",
      [vl_despesa_fixa, ds_despesa_fixa, id_usuario]
    );

    res.status(201).json({ id_despesa_fixa: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir despesa fixa", err);
    res.sendStatus(500).send("Erro ao inserir despesa fixa");
  }
});

router.get("/fixedExpenses", async (req, res) => {
  try {
    const despesasFixas = await db_query("SELECT * FROM tb_despesa_fixa");

    res.json(despesasFixas);
  } catch (err) {
    console.error("Erro ao buscar despesas fixas", err);
    res.sendStatus(500).send("Erro ao buscar despesas fixas");
  }
});

router.get("/fixedExpenses/:id", async (req, res) => {
  try {
    const despesasFixasId = req.params.id;

    const despesasFixas = await db_query(
      "SELECT * FROM tb_despesa_fixa WHERE id_despesa_fixa = ?",
      [despesasFixasId]
    );

    if (despesasFixas.length === 0) {
      res.status(404).send("Despesa fixa não encontrada");
      return;
    }

    res.json(despesasFixas[0]);
  } catch (err) {
    console.error("Erro ao buscar despesa fixa", err);
    res.sendStatus(500).send("Erro ao buscar despesa fixa");
  }
});

router.put("/fixedExpenses/:id", async (req, res) => {
  try {
    const despesaFixaId = req.params.id;
    const { vl_despesa_fixa, ds_despesa_fixa, id_usuario } = req.body;

    await db_query(
      "UPDATE tb_despesa_fixa SET vl_despesa_fixa = ?, ds_despesa_fixa = ?, id_usuario = ? WHERE id_despesa_fixa = ?",
      [vl_despesa_fixa, ds_despesa_fixa, id_usuario, despesaFixaId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar despesa fixa", err);
    res.sendStatus(500).send("Erro ao atualizar despesa fixa");
  }
});

router.delete("/fixedExpenses/:id", async (req, res) => {
  try {
    const despesaFixaId = req.params.id;

    await db_query("DELETE FROM tb_despesa_fixa WHERE id_despesa_fixa = ?", [
      despesaFixaId,
    ]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar despesa fixa", err);
    res.sendStatus(500).send("Erro ao deletar despesa fixa");
  }
});

module.exports = router;
