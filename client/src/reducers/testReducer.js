
export default (state = [], action) => {
    if (action.type === 'GET_RECOMMENDED') {
        return  action.payload
    }else if (action.type === 'SEARCH_BY_NAME'){
        return action.payload
    }else if (action.type === 'CREATE_BOOK'){
        return [ ...state,  action.payload ]
    }else if (action.type === 'DELETE_BOOK'){
        return deBook([...state], action.payload)
    }
    return state
}

const deBook = (books, id) => {
    let booklist = []
    for (const book of books){
        if (book.book_id == id){

        }else{
            booklist.push(book)
        }
    }
    return booklist
}