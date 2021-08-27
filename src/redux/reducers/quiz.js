import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} 
from '../actions/actionTypes'

const initialState = {
    quizes: [],
    loading: false,
    error: null,

    results: {},
    activeQuestion: 0,
    isQuizFinished: false,
    answerState: null,
    quiz: null,
}

export default function quizRender(state = initialState, actions) {
    switch(actions.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: actions.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: actions.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: actions.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: actions.answerState, results: actions.results
            }
        case FINISH_QUIZ:
            return {
                ...state, isQuizFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: actions.number, answerState: null
            }
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null, 
                isQuizFinished: false, 
                results: {}
            }
        default:
            return state
    }
}