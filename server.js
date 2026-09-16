const express = require('express');
const routerPublicar = require('./routers/publicar');
const routerPublicados = require('./routers/publicados');
const routerDelete = require('./routers/delete');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"https://valdivinosammy.github.io"
}));

app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/publicar", routerPublicar);
app.use("/publicados", routerPublicados);
app.use("/delete", routerDelete);


app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/client/index.html")
})



app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})