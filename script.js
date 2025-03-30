async function fetchJson(url) {
    const res = await fetch(url);
    const obj = await res.json();
    return obj;
}

async function getChefBirthday(id) {
    let post;
    try {
        post = await fetchJson(`https://dummyjson.com/recipes/${id}`);
        console.log("Ricetta: ", post);
    } catch (error) {
        throw new Error(`Non posso recuperare la ricetta con id: ${id}`)
    }
    if (post.message) {
        throw new Error(post.message);
    }
    let user;
    try {
        user = await fetchJson(`https://dummyjson.com/users/${post.userId}`);
        console.log("Chef: ", user);
    } catch (error) {
        throw new Error(`Non posso recuperare user id ${post.userId}`)
    }
    if(user.message) {
        throw new Error(user.message);
    }
    return user.birthDate;
}

(async () => {
    try {
        const birthDate = await getChefBirthday(5);
        console.log(birthDate);
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Fine");
    }
})();