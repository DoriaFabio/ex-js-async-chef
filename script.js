//! Funzione asincrona che effettua una richiesta HTTP a un URL e restituisce il JSON
async function fetchJson(url) {
    const res = await fetch(url);
    const obj = await res.json();
    return obj;
}

//! Funzione che, dato l'id di una ricetta, restituisce la data di nascita dello chef che l'ha creata
async function getChefBirthday(id) {
    let ricetta;
    try {
        ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`);
        console.log("Ricetta: ", ricetta);
    } catch (error) {
        throw new Error(`Non posso recuperare la ricetta con id: ${id}`)
    }
    if (ricetta.message) {
        throw new Error(ricetta.message);
    }
    let chef;
    try {
        chef = await fetchJson(`https://dummyjson.com/users/${ricetta.userId}`);
        console.log("Chef: ", chef);
    } catch (error) {
        throw new Error(`Non posso recuperare user id ${ricetta.userId}`)
    }
    if(chef.message) {
        throw new Error(chef.message);
    }
    return chef.birthDate;
}

//! Blocco di codice che si esegue subito (IIFE - Immediately Invoked Function Expression)
(async () => {
    try {
        const birthDate = await getChefBirthday(5);
        console.log("Data di nascita dello Chef:", birthDate);
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Fine");
    }
})();