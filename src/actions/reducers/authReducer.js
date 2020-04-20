import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL
} from "../actions/types";
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage'

const initialState = {
    token: getFromStorage('token'),
    isAuthenticated: null,
    isLoading: false,
    player: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                player: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            setInStorage('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                token: null,
                player: null,
                isAuthenticated: true,
                isLoading: false
            };
        default:
            return state;
    }
}