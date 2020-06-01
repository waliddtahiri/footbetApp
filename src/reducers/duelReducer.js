import { GET_DUELS, GET_DUELS_HISTORY } from '../actions/types';

const initialState = {
    duels: [],
    duelsHistory: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DUELS:
            return {
                ...state,
                duels: action.payload
            };
        case GET_DUELS_HISTORY:
            return {
                ...state,
                duelsHistory: action.payload
            };
        default:
            return state;
    }
}