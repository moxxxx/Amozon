export default (state = [], action) => {
    if (action.type === 'ADD_TO_BASKET') {
        return [ ...state,  action.payload ]
    }
    else if (action.type === 'EMPTY_BASKET'){
        return []
    }
    return state
}