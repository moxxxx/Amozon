export default (state = [], action) => {
    if (action.type === 'GET_RECOMMENDED') {
        return [ ...state,  action.payload ]
    }

    return state
}