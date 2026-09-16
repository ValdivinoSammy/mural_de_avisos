const express = require('express');
const router = express.Router();
let posts = require('../dados/posts');


router.delete("/", (req, res)=>{
    let id = req.body.id;
    posts.deletePost(id);
    res.send();
})


module.exports = router;