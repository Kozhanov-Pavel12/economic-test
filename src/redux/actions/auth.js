import { AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes'
import axios from '../../components/axios/axios-quiz'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTRF2OV6k9Fdxa11NI6G9mDQtTMklfVn0'

        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTRF2OV6k9Fdxa11NI6G9mDQtTMklfVn0'
        }

        const response = await axios.post(url, authData)

        const data = response.data

        //чтобы по прошествии часа нужно было снова авторизоваться в системе
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))

    }
}


export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch( autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000) )
            }
        }
    }
}


export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}


export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}


export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}