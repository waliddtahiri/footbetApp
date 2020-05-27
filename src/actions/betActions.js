import axios from 'axios';
import { GET_BETS, GET_BETS_HISTORY, ADD_BET } from './types';

export const getBetsCurrent = (id) => dispatch => {
    axios.get('http://192.168.0.239:5000/bets')
        .then(res => {
            let bets = [];
            let pari = null;
            res.data.forEach(async (bet) => {
                await axios.get(`http://192.168.0.239:5000/bets/${bet._id}`).then(res => pari = res.data);
                if (pari.player == id && pari.match.winner == "unknown") {
                    bets.push(pari);
                }
                dispatch({
                    type: GET_BETS,
                    payload: bets
                })
            })
        })
};

export const getBetsHistory = (id) => dispatch => {
    axios.get('http://192.168.0.239:5000/bets')
        .then(res => {
            let betsHistory = [];
            let pari = null;
            res.data.forEach(async (bet) => {
                await axios.get(`http://192.168.0.239:5000/bets/${bet._id}`).then(res => pari = res.data);
                if (pari.player == id && pari.match.winner != "unknown") {
                    betsHistory.push(pari);
                }
                dispatch({
                    type: GET_BETS_HISTORY,
                    payload: betsHistory
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
