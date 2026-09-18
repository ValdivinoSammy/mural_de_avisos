import { auth } from "./firebase/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const btnLoginIndex = document.querySelector("#login");
const btnDeslogarIndex = document.querySelector("#deslogar");
const formDiv = document.querySelector(".form");
const inputTitulo = document.querySelector('[name="titulo"]');
const inputDescri = document.querySelector('[name="descri"]');
const mural = document.querySelector("#mural");

let cardOn = false;

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        btnLoginIndex.style.display = "";
        btnDeslogarIndex.style.display = "none";
        return;
    }

    btnLoginIndex.style.display = "none";
    btnDeslogarIndex.style.display = "";
    busquePosts();
    const resultadoToken = await user.getIdTokenResult(true);
    const eAdmin = resultadoToken.claims.admin === true;

    if (eAdmin) {
        formDiv.style.display = "";
    }

});


document.querySelector("#publicar").addEventListener("click", async ()=> {
    if (!inputDescri.value || !inputTitulo.value) { return }

    const token = await auth.currentUser.getIdToken();

    fetch("https://mural-de-avisos-z3c1.onrender.com/publicar", {
        method: "POST",

        headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 },

        body: JSON.stringify({
            titulo: inputTitulo.value,
            descri: inputDescri.value
        })
    }).then(res => {
        if (res.ok) {
            inputTitulo.value = "";
            inputDescri.value = "";
            busquePosts();
        } else {
            alert("Houve algum erro ao tentar enviar o seu post")
        }
    })

});

async function busquePosts() {

    const token = await auth.currentUser.getIdToken();

    fetch("https://mural-de-avisos-z3c1.onrender.com/publicados", {
        headers: {Authorization: `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(posts => {
            mural.innerHTML = "";
            posts.forEach(post => {

                const div = document.createElement("div");
                div.id = post.id;
                div.addEventListener("click", avisoDel);
                mural.appendChild(div);

                const tituloh2 = document.createElement("h2");
                div.appendChild(tituloh2);
                tituloh2.innerText = post.titulo;

                const descrição = document.createElement("p");
                div.appendChild(descrição);
                descrição.innerHTML = post.descri;
            })
        })
};

function avisoDel(event) {
    if (cardOn) { return };
    cardOn = true;
    const card = document.createElement("div");
    card.classList.add("confirDel");
    document.body.appendChild(card);

    const aviso = document.createElement("h3");
    card.appendChild(aviso);
    aviso.innerText = "Tem certeza que deseja apagar esse post para sempre?";

    const sim = document.createElement("div");
    card.appendChild(sim);
    sim.innerText = "SIM";
    sim.id = event.currentTarget.id;
    sim.addEventListener("click", () => {
        deletar(this);
        removeCard(card);
    })

    const nao = document.createElement("div");
    card.appendChild(nao);
    nao.innerText = "NÃO";
    nao.addEventListener("click", () => {
        removeCard(card);
    })
}

function removeCard(card) {
    document.body.removeChild(card);
    cardOn = false;
}

async function deletar(esse, card) {

    const token = await auth.currentUser.getIdToken();

    fetch("https://mural-de-avisos-z3c1.onrender.com/delete", {
        method: "DELETE",

        headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            id: esse.id
        })
    }).then(res => {
        if (res.ok) {
            busquePosts();
        }
    })

}

btnDeslogarIndex.addEventListener("click", () => {
    signOut(auth).then(() => {
        // formDiv.style.display = "none";
        window.location.reload();
    }).catch(error => {
        console.log("houve algum erro:", error)
    });
});