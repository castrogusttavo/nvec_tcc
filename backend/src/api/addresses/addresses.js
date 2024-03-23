const express = require("express");
const router = express.Router();
const {db_query} = require("../../db");

router.post("/addresses", async (req, res) => {
    try{
        const {id_bairro} = req.body;

        const result = await db_query("INSERT INTO enderecos (id_bairro) VALUES (?) RETURNING *", [id_bairro]);

        res.status(201).json({ id_endereco: result.insertId})
    } catch (err) {
        console.error("Erro ao inserir endereço", err);
        res.sendStatus(500).send("Erro ao inserir endereço");
    }
});

router.get("/addresses", async (req, res) => {
    try{    
        const enderecos = await db_query("SELECT * FROM enderecos");

        res.json(enderecos);
    } catch (err) {
        console.error("Erro ao buscar endereços", err);
        res.sendStatus(500).send("Erro ao buscar endereços");
    }
});

router.get("/addresses/:id", async (req, res) => {
    try{
        const enderecosId = req.params.id;

        const enderecos = await db_query("SELECT * FROM enderecos WHERE id_endereco = ?", [enderecosId]);
        
        if (enderecos.length === 0) {
            res.status(404).send("Endereço não encontrado");
            return;
        }

        res.json(enderecos[0]);
    } catch (err) {
        console.error("Erro ao buscar endereço", err);
        res.sendStatus(500).send("Erro ao buscar endereço");
    }
});

router.put("/addresses/:id", async (req, res) => {
    try{
        const enderecoId = req.params.id;
        const {id_bairro} = req.body;

        await db_query("UPDATE enderecos SET id_bairro = ? WHERE id_endereco = ?", [id_bairro, enderecoId]);

        res.sendStatus(200);
    } catch (err) {
        console.error("Erro ao atualizar endereço", err);
        res.sendStatus(500).send("Erro ao atualizar endereço");
    }
});

router.delete("/addresses/:id", async (req, res) => {
    try{
        const enderecoId = req.params.id;

        await db_query("DELETE FROM enderecos WHERE id_endereco = ?", [enderecoId]);

        res.sendStatus(200);
    } catch (err) {
        console.error("Erro ao deletar endereço", err);
        res.sendStatus(500).send("Erro ao deletar endereço");
    }
});

module.exports = router;