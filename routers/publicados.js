const express = require('express');
const router = express.Router();
let posts = require('../dados/posts');


router.get("/", (req, res) => {
    res.json(posts.pegueTodos());
})


module.exports = router;