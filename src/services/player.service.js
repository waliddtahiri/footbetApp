import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/players';

class PlayerService {

    async getOne(m) {

        const player = [];

        await axios.get('http://192.168.0.239:5000/players/' + m).then(res => {
            if (res.data.length == 1)
                player.push(...res.data);
        })

        return player;
    }

    async update(p, player) {
        await axios.put('http://192.168.0.239:5000/players/update/' + p, player).then(res => true)
            .catch(err => console.log(err));
    }

}

export {
    PlayerService
};