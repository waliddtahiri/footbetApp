import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL
} from "./types";


// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios.get('http://192.168.0.239:5000/auth/player' + tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// register user
export const register = ({ username, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // request body
    const body = JSON.stringify({ username, password });

    axios.post('http://192.168.0.239:5000/auth/signup', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });

}

// login user
export const login = ({ username, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // request body
    const body = JSON.stringify({ username, password });

    axios.post('http://192.168.0.239:5000/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// setup config/headers and token
export const tokenConfig = getState => {
    // get token from localstorage
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}