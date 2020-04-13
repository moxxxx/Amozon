const INTIAL_STATE = []

export default (state = INTIAL_STATE, action) => {
    if (action.type === 'FETCH_USER') {
        return action.payload
    }else if (action.type === 'REGISTER'){
        return action.payload
    }else if (action.type === 'SEND_ORDER'){
        return [action]
    }
    return state
}