const express = require('express');
const router = express.Router();
const db = require('../firebase-adm/firebase-adm');

router.post("/", async (req, res) => {  

    await db.collection("posts").add({
        titulo: req.body.titulo,
        descri: req.body.descri
    })
    res.send();
})


module.exports = router;