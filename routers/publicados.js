const express = require('express');
const router = express.Router();
const db = require('../firebase-adm/firebase-adm');

router.get("/", async (req, res) => {

    const snapshot = await db.collection("posts").get();
    let posts = snapshot.docs.map(doc=>({
          id: doc.id,
          titulo: doc.data().titulo,
          descri: doc.data().descri,
        }))
    res.json(posts);
})


module.exports = router;