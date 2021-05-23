import axios from 'axios'
import {createMessage, returnErrors} from './messages'

import * as actions from './types'


// Check the token and load the user
export const loaduser = () => (dispatch, getState) => {
    dispatch({
        type: actions.USER_LOADING
    })

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: actions.USER_LOADED,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: actions.AUTH_ERROR
        })
    })
}


// LOGIN USER
export const loginUser = (username, password) => dispatch => {


    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config)
    .then(res => {
        dispatch(createMessage({loginSuccess: 'Logged in Successfully!'}))
        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({type: actions.LOGIN_FAIL})
    })
}

export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({logoutSuccess: 'Logged out Successfully!'}))
        dispatch({
            type: actions.LOGOUT_SUCCESS
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}


export const registerUser = ({username, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username, email, password})

    axios.post('/api/auth/register', body, config)
    .then(res => {
        dispatch(createMessage({registerSuccess: 'Registration complete!'}))
        dispatch({
            type: actions.REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({type: actions.REGISTER_FAIL})
    })
}

// Setup config with token
export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}