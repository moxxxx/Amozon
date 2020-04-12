export default (state = null, action) => {
    if (action.type === 'GET_RECOMMENDED') {
        return  action.payload
    }

    return state
}