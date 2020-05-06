import axios from 'axios';
import { GET_BETS, ADD_BET, DELETE_BET } from './types';

export const getBets = () => dispatch => {
    return {
        type: GET_BETS
    };
};
