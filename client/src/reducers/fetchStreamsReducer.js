const INTIAL_STATE = []

export default (state = INTIAL_STATE, action) => {
    if (action.type === 'FETCH_STREAMS') {
        return action.payload
    }
    return state
}