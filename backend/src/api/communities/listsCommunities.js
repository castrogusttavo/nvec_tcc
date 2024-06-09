const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

// JOIN para pegar todas as listas da comunidade
  // Tabela comunidade_listas -> listas usuários
  // Nova Tabela lista_base_comunidade -> lista base com os itens

  router.get('/listCommunities/:idCommunity', async (req, res) => {
    try {
      const idCommunity = req.params.idCommunity;

      const listsCommunity = await db_query(`
        SELECT *
        FROM 
          tb_comunidade_lista as cl
        JOIN 
          tb_lista AS l ON cl.id_lista = l.id_lista
        WHERE 
          cl.id_comunidade = ?
      `, [idCommunity])

      // Limpar a data
      const cleanedListsCommunity = listsCommunity.map(list => {
        const date = new Date(list.dt_criacao);
        const formattedDate = date.toISOString().split('T')[0];
        return { ...list, dt_criacao: formattedDate };
      });

      res.send(cleanedListsCommunity);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  router.get('/lowestList/:idCommunity', async (req, res) => {
    try {
      const idCommunity = req.params.idCommunity;

      const lowestList = await db_query(`
        SELECT *
        FROM
          tb_lista l
        JOIN
          tb_comunidade_lista cl ON l.id_lista = cl.id_lista
        WHERE
          cl.id_comunidade = ?
        ORDER BY
          vl_gasto
        LIMIT 1
      `, [idCommunity])

      // Limpar a data
      const cleanedListsCommunity = lowestList.map(list => {
        const date = new Date(list.dt_criacao);
        const formattedDate = date.toISOString().split('T')[0];
        return { ...list, dt_criacao: formattedDate };
      });

      res.send(cleanedListsCommunity);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })


  router.get('/userCommunity/:idCommunity', async (req, res) => {
    try {
      const idCommunity = req.params.idCommunity;

      const users = await db_query(`
        SELECT *
        FROM
          tb_usuario u
        JOIN
          tb_comunidade_usuario cu ON cu.id_usuario = u.id_usuario
        WHERE
          cu.id_comunidade = ?
          AND cu.id_usuario != (SELECT id_criador FROM tb_comunidade WHERE id_comunidade = ?);
      `, [idCommunity,idCommunity])


      res.json(users);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })


  module.exports = router;