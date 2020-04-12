export default (state = [], action) => {
    if (action.type === 'GET_RECOMMENDED') {
        return  action.payload
    }else if (action.type === 'SEARCH_BY_NAME'){
        return action.payload
    }else if (action.type === 'CREATE_BOOK'){
        return [ ...state,  action.payload ]
    }
    return state
}