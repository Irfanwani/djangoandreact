import axios from 'axios'
import {returnErrors} from './messages'

import * as actions from './types'


// Check the token and load the user
export const loaduser = () => (dispatch, getState) => {
    dispatch({
        type: actions.USER_LOADING
    })

    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('/api/auth/user', config)
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
    console.log(body)

    axios.post('/api/auth/login', body, config)
    .then(res => {
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