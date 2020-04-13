let admins = ["101585595450024077553", "106543447785281052218"]


export const isAdmin = (id) => {
        for (let admin of admins){
            if (id === admin)
                return true
        }
        return false
}

export const sumUpBooks= (basket) =>{
    let booksIDs = []
    for (let book of basket){
        if (!booksIDs.includes(book.book_id)){
            booksIDs.push(book.book_id)
        }
    }
    let books = {}
    for (let bookid of booksIDs){
        let count = 0
        for (let book of basket) {
            if (book.book_id == bookid)
                count++
        }
        books[bookid]= count
    }
    return books
}