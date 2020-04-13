const INTIAL_STATE = {
    totalReport: null,
    genreReport: null,
    authorReport:null
}
export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case 'RENDER_REPORT':
            return { ...state, totalReport: action.payload }
        default:
            return state
    }
}