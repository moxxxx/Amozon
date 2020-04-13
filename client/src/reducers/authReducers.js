const INTIAL_STATE = {
    isSignIn: null,
    userId: null,
    name:null,
    last_order: null,
    orderDetail:null
}
export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSignIn: true, userId: action.payload.id, name: action.payload.name, email: action.payload.email }
        case 'SIGN_OUT':
            return { ...state, isSignIn: false, userId: null, name:null , email: null}
        case  'SEND_ORDER':
            return {...state, last_order: action.payload}
        case 'CHECK_ORDER':
            return {...state,orderDetail: action.payload }
        default:
            return state
    }
}