import { GET_BETS, GET_BETS_HISTORY, ADD_BET, DELETE_BET } from '../actions/types';

const initialState = {
    bets: [],
    betsHistory: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BETS:
            return {
                ...state,
                bets: action.payload
            };
        case GET_BETS_HISTORY:
            return {
                ...state,
                betsHistory: action.payload
            };
        case DELETE_BET:
            return {
                ...state,
                bets: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_BET:
            return {
                ...state,
                bets: [action.payload, ...state.bets]
            };
        default:
            return state;
    }
}