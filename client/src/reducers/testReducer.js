export default (state = [], action) => {
    if (action.type === 'TEST') {
        return [ ...state,  action.payload ]
    }

    return state
}