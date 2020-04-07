import { combineReducers } from 'redux'
import authReducers from './authReducers'
import { reducer as formReducer } from 'redux-form'
// import fetchStreamsReducer from './fetchStreamsReducer'
import streamReducer from './streamReducer'
import userReducer from './userReducer'

export default combineReducers({
    auth: authReducers,
    form: formReducer,
    streams: streamReducer,
    user: userReducer
})