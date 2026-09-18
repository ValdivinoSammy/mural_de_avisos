import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const btnLogin = document.getElementById("btn");
const btnCriar = document.getElementById("btn2");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

let trade = true;

document.addEventListener("DOMContentLoaded", () =>{
    btnLogin.addEventListener("click", logar);
    btnCriar.addEventListener("click", criarUser);

    document.getElementById("alter").addEventListener("click", () => {
    if (trade) {
        btnLogin.style.display = "none";
        btnCriar.style.display = "";
        trade = false;
    } else {
        btnLogin.style.display = "";
        btnCriar.style.display = "none";
        trade = true;
    };
});
})


function logar() {
    let valorEmail = email.value;
    let valorSenha = senha.value;
    signInWithEmailAndPassword(auth, valorEmail, valorSenha)
        .then(credencialDoUser => {
            console.log(credencialDoUser.user);
            window.location.href = "../";
        })
        .catch(error => {
            console.log("Houve um erro no login:", error);
            alert("Não foi possivel concluir o login da sua conta, tente novamente")
        });
};

function criarUser() {
    let valorEmail = email.value;
    let valorSenha = senha.value;

    createUserWithEmailAndPassword(auth, valorEmail, valorSenha)
    .then( (credencialDoUser)=>{
        console.log("Usuario criado!");
        console.log(credencialDoUser.user);
        window.location.href = "../";
    }).catch((error)=>{
        console.log("houve um erro:", error)
        alert("Não foi possivel concluir a criação da sua conta, Verifique seu email e certifique se de que sua senha tenha no mínimo 6 caracteres")
    })
}



// onAuthStateChanged(auth, async (user) => {

//     if (user) {

//         const token = await user.getIdToken();
//         console.log("O Usuario está logado:", user.email);

//     } else {
//         console.log("Ninguem está logado");
//     }
// });

