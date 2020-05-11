import axios from 'axios';
import { GET_BETS, ADD_BET, DELETE_BET } from './types';

export const getBets = (id) => dispatch => {
    axios.get('http://192.168.0.239:5000/players/getBets/' + id)
        .then(res => {
            let pari = undefined;
            let bets = [];
            res.data.forEach(async (bet) => {
                await axios.get(`http://192.168.0.239:5000/bets/${bet._id}`).then(res => pari = res.data);
                if (pari.match.winner === "unknown") {
                    bets.push(pari);
                }
                dispatch({
                    type: GET_BETS,
                    payload: bets
                })
            })
        })
};

export const addBet = bet => {
    return {
        type: ADD_BET,
        payload: bet
    }
}
