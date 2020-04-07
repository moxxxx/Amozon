import streams from '../api/streams'
import history from '../history'

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
    const responce = await streams.post('/Books', { ...formValues, userId })
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

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/Books/${id}`, formValues)
    dispatch({
        type: 'EDIT_STREAM',
        payload: response.data
    })
    history.push('/')
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`Books/${id}`)
    dispatch({
        type: 'DELETE_STREAM',
        payload: id
    })
}
