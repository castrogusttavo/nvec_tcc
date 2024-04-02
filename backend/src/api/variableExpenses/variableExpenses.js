const express = require("express");
const router = express.Router();
const { db_query } = require("../../db");

router.post("/variableExpenses", async (req, res) => {
  try {
    const { vl_despesa_var, ds_despesa_var, id_usuario } = req.body;

    const result = await db_query(
      "INSERT INTO tb_despesa_variavel (vl_despesa_var, ds_despesa_var, id_usuario) VALUES (?, ?, ?) RETURNING *",
      [vl_despesa_var, ds_despesa_var, id_usuario]
    );

    res.status(201).json({ id_despesa_var: result.insertId });
  } catch (err) {
    console.error("Erro ao inserir despesa variável", err);
    res.status(500).send("Erro ao inserir despesa variável");
  }
});

router.get("/variableExpenses", async (req, res) => {
  try {
    const despesasVariaveis = await db_query("SELECT * FROM tb_despesa_variavel");

    res.json(despesasVariaveis);
  } catch (err) {
    console.error("Erro ao buscar despesas variáveis", err);
    res.status(500).send("Erro ao buscar despesas variáveis");
  }
});

router.get("/variableExpenses/:id", async (req, res) => {
  try {
    const despesaVariavelId = req.params.id;

    const despesaVariavel = await db_query(
      "SELECT * FROM tb_despesa_variavel WHERE id_despesa_var = ?",
      [despesaVariavelId]
    );

    if (despesaVariavel.length === 0) {
      res.status(404).send("Despesa variável não encontrada");
      return;
    }

    res.json(despesaVariavel[0]);
  } catch (err) {
    console.error("Erro ao buscar despesa variável", err);
    res.status(500).send("Erro ao buscar despesa variável");
  }
});

router.put("/variableExpenses/:id", async (req, res) => {
  try {
    const despesaVariavelId = req.params.id;
    const { vl_despesa_var, ds_despesa_var, id_usuario } = req.body;

    await db_query(
      "UPDATE tb_despesa_variavel SET vl_despesa_var = ?, ds_despesa_var = ?, id_usuario = ? WHERE id_despesa_var = ?",
      [vl_despesa_var, ds_despesa_var, id_usuario, despesaVariavelId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar despesa variável", err);
    res.status(500).send("Erro ao atualizar despesa variável");
  }
});

router.delete("/variableExpenses/:id", async (req, res) => {
  try {
    const despesaVariavelId = req.params.id;

    await db_query("DELETE FROM tb_despesa_variavel WHERE id_despesa_var = ?", [despesaVariavelId]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar despesa variável", err);
    res.status(500).send("Erro ao deletar despesa variável");
  }
});

module.exports = router;
