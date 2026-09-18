const adminAuth = require("firebase-admin/auth");

const getAuth = adminAuth.getAuth;

const auth = getAuth();

const uid = "lhv3teanLWXIlhmE0AMkhCR8CWv2";

auth.setCustomUserClaims(uid, {
    admin: true
})
.then(() => {
    console.log("Usuário definido como administrador!");
})
.catch((erro) => {
    console.log("Erro:", erro);
});