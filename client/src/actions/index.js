import streams from '../api/streams'
import history from '../history'
import db from '../api/db'

export const signIn = (userinfo) => {
    return {
        type: 'SIGN_IN',
        payload: userinfo
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const responce = await streams.post('/Books', { ...formValues , userId})
    dispatch({
        type: 'CREATE_STREAM',
        payload: responce.data
    })
    // programmatic navigation
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/Books');
    dispatch({
        type: 'FETCH_STREAMS', payload: response.data
    })
}


export const getRecommended = () => async dispatch => {
    const response = await db.get('/getRecommended');
    dispatch({
        type: 'GET_RECOMMENDED', payload: response.data
    })
}



export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/Books/${id}`)
    dispatch({
        type: 'FETCH_STREAM', payload: response.data
    })
}


export const fetchUser = (userId) => async dispatch => {
    const response = await streams.get(`/Users/${userId}`)
    dispatch({
        type: 'FETCH_USER', payload: response.data
    })
}

export const addToBasket = (book) => {
    return{
        type: 'ADD_TO_BASKET',
        payload:book
    }
}

export const searchByName = (keywords)=> async dispatch =>{
    const responce = await db.get(`/search/${keywords}`)
    dispatch({
        type: 'SEARCH_BY_NAME', payload: responce.data
    })
}

export const emptyBasket = () =>{
    return{
        type: 'EMPTY_BASKET'
    }
}


export const register = (info) => {
    db.post('/register', { "name": info.name, "email":info.email })

}


export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/Books/${id}`, formValues)
    dispatch({
        type: 'EDIT_STREAM',
        payload: response.data
    })
    history.push('/')
}

export const createBook = formValues => async (dispatch) => {
    const responce = await db.post('/create_book', { ...formValues })
    dispatch({
        type: 'CREATE_BOOK',
        payload: responce.data
    })
    // programmatic navigation
    history.push('/')
}

export const deleteBook = (id) => async dispatch => {
    await db.delete(`delete_book/${id}`)
    dispatch({
        type: 'DELETE_BOOK',
        payload: id
    })
}

export const sendOrder = (value) => async (dispatch) => {
    const response = await db.post('/create_order', { ...value })
    dispatch({
        type: 'SEND_ORDER',
        payload: response.data
    })
    history.push('/user_center')
}

export const checkOrder = (orderNum) => async dispatch => {
    const response = await db.get(`/check_order/${orderNum}`)
    dispatch({
        type: 'CHECK_ORDER', payload: response.data
    })
}


export const deleteStream = (id) => async dispatch => {
    await streams.delete(`Books/${id}`)
    dispatch({
        type: 'DELETE_STREAM',
        payload: id
    })
}
