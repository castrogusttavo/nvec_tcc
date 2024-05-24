const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// Total Gasto
  // vl_gasto por lista + id_ctg 
  // 4 categorias que mais gastou

// Total Economizado
  // vl_total - vl_gasto + id_ctg
  // 4 categorias que mais economizou

// Balanço geral
  // Listas Criadas pelo Usuário
  // Comparações feitas
  // Listas Finalizadas

  module.exports = router;