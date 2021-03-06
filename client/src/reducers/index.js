import { combineReducers } from 'redux'
import authReducers from './authReducers'
import { reducer as formReducer } from 'redux-form'
// import fetchStreamsReducer from './fetchStreamsReducer'
import basketReducer from './basketReducer'
import streamReducer from './streamReducer'
import userReducer from './userReducer'
import testReducer from './testReducer'
import reportReducer from './reportReducer'

export default combineReducers({
    auth: authReducers,
    form: formReducer,
    streams: streamReducer,
    user: userReducer,
    basket:basketReducer,
    books:testReducer,
    reports: reportReducer
})