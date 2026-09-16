const inputTitulo = document.querySelector('[name="titulo"]');
const inputDescri = document.querySelector('[name="descri"]');
const mural = document.querySelector("#mural");

let cardOn = false;

function publicar(){
    if(!inputDescri.value || !inputTitulo.value){return}

    fetch("/publicar", {
        method:"POST",

        headers:{"Content-Type": "application/json"},

        body: JSON.stringify({
            titulo: inputTitulo.value,
            descri: inputDescri.value
        })
    }).then(res=>{
        if(res.ok){
        inputTitulo.value = "";
        inputDescri.value = "";
        busquePosts();
        }else{
            alert("Houve algum erro ao tentar enviar o seu post")
        }
    })
    
};

function busquePosts() {
    fetch("/publicados")
        .then(res => res.json())
        .then(posts => {
            mural.innerHTML = "";
            posts.forEach(post => {

                const div = document.createElement("div");
                div.id = post.id ;
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

function avisoDel(event){
    if(cardOn){return};
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
    sim.addEventListener("click",()=>{
        deletar(this);
        removeCard(card);
    })

    const nao = document.createElement("div");
    card.appendChild(nao);
    nao.innerText = "NÃO";
    nao.addEventListener("click",()=>{
        removeCard(card);
    })
}

function removeCard(card){
    document.body.removeChild(card);
        cardOn = false;
}

function deletar(esse, card){
    fetch("/delete", {method:"DELETE",

    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
    id: esse.id
    })
    }).then(res=>{
        if(res.ok){
        busquePosts();
        }
    })
    
}

document.addEventListener("DOMContentLoaded",()=>{busquePosts();});