const express = require('express');
const router = express.Router();
const db = require('../firebase-adm/firebase-adm');


router.delete("/", async (req, res)=>{
    let id = req.body.id;
    await db.collection("posts").doc(id).delete()
    res.send();
})


module.exports = router;