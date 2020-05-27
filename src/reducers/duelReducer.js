import { GET_DUELS } from '../actions/types';

const initialState = {
    duels: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DUELS:
            return {
                ...state,
                duels: action.payload
            };
        default:
            return state;
    }
}