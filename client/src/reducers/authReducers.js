const INTIAL_STATE = {
    isSignIn: null,
    userId: null,
    name:null
}
export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSignIn: true, userId: action.payload.id, name: action.payload.name }
        case 'SIGN_OUT':
            return { ...state, isSignIn: false, userId: null, name:null }
        default:
            return state
    }
}