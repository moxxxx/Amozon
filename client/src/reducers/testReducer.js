export default (state = [], action) => {
    if (action.type === 'GET_RECOMMENDED') {
        return  action.payload
    }

    return state
}