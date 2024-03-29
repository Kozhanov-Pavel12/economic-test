import { combineReducers } from 'redux';
import createReducer from './create'
import quizRender from './quiz';
import authReducer from './auth'

export default combineReducers({
    quiz: quizRender,
    create: createReducer,
    auth: authReducer
})