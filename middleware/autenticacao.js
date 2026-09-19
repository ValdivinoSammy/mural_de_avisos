const auth = require("../firebase-adm/auth-adm");


async function verificarUsuario(req, res, next) {

    const autorizacao = req.headers.authorization;

    if (!autorizacao) {
        return res.status(401).json({
            erro: "Usuário não autenticado"
        });
    }

    const partes = autorizacao.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            erro: "Token inválido"
        });
    }

    const token = partes[1];

    try {

        const usuario = await auth.verifyIdToken(token);

        req.usuario = usuario;

        next();

    } catch (erro) {

        return res.status(401).json({
            erro: "Token inválido ou expirado"
        });

    }
}


function verificarAdmin(req, res, next) {

    console.log("EMAIL:", req.usuario.email);
    console.log("ADMIN:", req.usuario.admin);
    
    if (req.usuario.admin !== true) {

        console.log("NEGADO");

        return res.status(403).json({
            erro: "Acesso permitido somente para administradores"
        });
    }

    console.log("LIBERADO");

    next();
}


module.exports = {
    verificarUsuario,
    verificarAdmin
};