module.exports = {

    posts: [],

    pegueTodos() {
        return this.posts;
    },

    novoPost(titulo, descri) {

        this.posts.push({ id: randomID(), titulo, descri })
    },

    deletePost(id) {

        let idParaApagar = id;
        let positionArray = this.posts.findIndex(post => post.id === idParaApagar);
        this.posts.splice(positionArray, 1);
    }

}

function randomID() {
    return Math.random().toString(36).substr(2, 9);
}