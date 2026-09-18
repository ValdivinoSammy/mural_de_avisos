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

    if (req.usuario.admin !== true) {
        return res.status(403).json({
            erro: "Acesso permitido somente para administradores"
        });
    }

    next();
}


module.exports = {
    verificarUsuario,
    verificarAdmin
};