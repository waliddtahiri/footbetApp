import axios from 'axios';
import { GET_DUELS } from './types';

export const getDuelsHistory = (username) => dispatch => {
    axios.get('http://192.168.0.239:5000/duels')
        .then(res => {
            let duels = [];
            res.data.forEach(async (duel) => {
                let challenger = undefined;
                let challenged = undefined;
                let vs = undefined;
                await axios.get(`http://192.168.0.239:5000/duels/${duel._id}`).then(res => vs = res.data);
                await axios.get(`http://192.168.0.239:5000/challenges/${duel.challenger}`).then(res => challenger = res.data);
                await axios.get(`http://192.168.0.239:5000/challenges/${duel.challenged}`).then(res => challenged = res.data)
                if (duel.winner != "unknown" && challenger.opponent.username == username) {
                    duels.push({ duel: vs, player1: challenged, player2: challenger });
                }
                if (duel.winner != "unknown" && challenged.opponent.username == username) {
                    duels.push({ duel: vs, player1: challenger, player2: challenged });
                }
                dispatch({
                    type: GET_DUELS,
                    payload: duels
                })
            })
        })
};