import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/players';

class PlayerService {

    async getAll() {

        const players = [];

        await axios.get('http://192.168.0.239:5000/players').then(res => {
            players.push(...res.data);
        })

        return players;
    }

    async getOne(m) {

        let player = undefined;

        await axios.get('http://192.168.0.239:5000/players/' + m).then(res => {
            if (res.data.length == 1)
                player = res.data[0]
        })

        return player;
    }

    async addBet(player, bet) {
        await axios.post('http://192.168.0.239:5000/players/addBet/' + player, bet)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    async addDuel(player, duel) {
        await axios.post('http://192.168.0.239:5000/players/addDuel/' + player, duel)
            .then(res => challenge = res.data)
            .catch(err => console.log(err));
    }

    async addDuelPlayer2(player, duel) {
        await axios.post('http://192.168.0.239:5000/players/addDuelPlayer2/' + player, duel)
            .catch(err => console.log(err));
    }

}

export {
    PlayerService
};