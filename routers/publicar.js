const express = require('express');
const router = express.Router()
let posts = require('../dados/posts');

router.post("/", (req, res) => {  

    let titulo = req.body.titulo;
    let descri = req.body.descri;
    posts.novoPost(titulo, descri);
    res.send();
})





module.exports = router;