const express = require('express');
require('./firebase-adm/firebase-adm');
const routerPublicar = require('./routers/publicar');
const routerPublicados = require('./routers/publicados');
const routerDelete = require('./routers/delete');
const autenticacao = require('./middleware/autenticacao');
const path = require("path");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"https://valdivinosammy.github.io"
}));


app.use(express.json());
app.use(express.urlencoded());
app.use("/firebase", express.static(path.join(__dirname, "firebase")));
app.use("/publicar", autenticacao.verificarUsuario, autenticacao.verificarAdmin, routerPublicar);
app.use("/publicados",autenticacao.verificarUsuario, routerPublicados);
app.use("/delete", autenticacao.verificarUsuario, autenticacao.verificarAdmin, routerDelete);


app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
})
app.get("/index.js",(req, res)=>{
    res.sendFile(path.join(__dirname, "index.js"));
})
app.get("/style.css",(req, res)=>{
    res.sendFile(path.join(__dirname, "style.css"));
})

app.get("/login/login.html",(req, res)=>{
    res.sendFile(path.join(__dirname, "login/login.html"));
})



app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})