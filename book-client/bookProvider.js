const apiUrl = "https://localhost:7154/api/books";


const provider = {
    getBooks: async () => {
        return fetch(apiUrl)
            .then((res) => res.json())
    },
    getBook: async (id) => {
        return fetch(`${apiUrl}/${id}`)
            .then((res) => res.json())
    },
    addBook: async (data) => {
        await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            method: "post",
        })
    },
    editBook: async (data) => {
        await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            method: "put",
        })
    },
    deleteBook: async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: "delete",
        })
    }
}