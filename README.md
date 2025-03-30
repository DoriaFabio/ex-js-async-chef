// function getPost(id) {
//     return new Promise((res, rej) => {
//         fetch(`https://dummyjson.com/posts/${id}`)
//             .then(res => res.json())
//             .then(post => {
//                 fetch(`https://dummyjson.com/users/${post.userId}`)
//                     .then(res => res.json())
//                     .then(user => res({ ...post, user }))
//                     .catch(rej)
//             })
//             .catch(rej)
//     })
// }

// getPost(1)
//     .then(post => console.log("Post completo ", post))
//     .catch(error => console.error(error));
//     .finally() => console.log("Fine");

# Trasformare getPost in async/await con gestione errori

async function fetchJson(url) {
    const res = await fetch(url);
    const obj = await res.json();
    return obj;
}

//? Inserire il fetchJson ci risparmia di mettere il .then(res => res.json())
//? Se inserisco la parola async prima della funzione getPost, posso evitare di scrivere return new Promise e quindi fare la chiamata fetch 2 volte

async function getPost(id) {
    let post;
    try {
        post = await fetchJson(`https://dummyjson.com/posts/${id}`);
    } catch (error) {
        throw new Error(`Non posso recuperare post id ${id}`)
    }
    if(post.message) {
        throw new Error(post.message);
    }
    let user;
    try {
        user = await fetchJson(`https://dummyjson.com/users/${post.userId}`);
    } catch (error) {
        throw new Error(`Non posso recuperare user id ${post.userId}`)
    }
    if(user.message) {
        throw new Error(user.message);
    }
    return { ...post, user };
}

(async () => {
    try {
        const post = await getPost(5);
        console.log("Post completo: ", post);
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Fine");
    }
})();

# Error Handling (generici)
function divide(a, b) {
    if (b === 0) {
        throw new Error("Impossibile dividere per zero");
    }
    return a / b;
}

try {
    const risultato = divide(2, 1);
    console.log("Risultato: ", risultato);
} catch (error) {
    console.error(error);
} finally {
    console.log("Fine del mio codice");
}

