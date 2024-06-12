const express = require("express");
const router = express.Router();
const { db_query } = require("../../frameworks/db/db");

router.get('/comparacao/:communityId', async (req, res) => {

    const communityId = req.params.communityId
    try {
        const result = await db_query(
            "CALL comparacao(?)",
            [communityId]
        )

        res.json(result[0])
    } catch(err) {
        console.error("Erro ao chamar procedure: ", err);
        res.status(500).send("Erro ao chamar procedure");
    }

})

module.exports = router;