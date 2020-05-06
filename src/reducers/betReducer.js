import { GET_BETS, ADD_BET, DELETE_BET } from '../actions/types';

const initialState = {
    items: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_BETS:
            return {
                ...state
            };
        case DELETE_BET:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_BET:
            return{
                ...state,
                items: [action.payload, ...state.items]
            };
        default:
            return state;
    }
}