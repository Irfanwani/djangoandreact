import * as actions from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}


export default function(state = initialState, action) {
    switch(action.type) {
        case actions.USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        
        case actions.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case actions.REGISTER_SUCCESS:
        case actions.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        
        case actions.LOGIN_FAIL:
        case actions.AUTH_ERROR:
        case actions.LOGOUT_SUCCESS:
        case actions.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: null,
                isLoading: false
            }
        default:
            return state
    }
}
