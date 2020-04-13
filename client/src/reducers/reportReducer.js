const INTIAL_STATE = {
    totalReport: null,
    genreReport: null,
    authorReport:null
}
export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case 'RENDER_REPORT':
            return { ...state, totalReport: action.payload }
        case 'RENDER_GENRE_REPORT':
            return {...state, genreReport : action.payload}
        default:
            return state
    }
}