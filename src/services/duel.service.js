import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/duels';

class DuelService {

    async getDuel(id) {
        const {data} = await axios.get(`http://192.168.0.239:5000/duels/${id}`);

        return data;
    }

    async getDuelChallenger(id) {
        const {data} = await axios.get(`http://192.168.0.239:5000/duels/challenger/${id}`);

        return data;
    }

    async getChallenged(id) {
        const {data} = await axios.get(`http://192.168.0.239:5000/duels/challenged/${id}`);

        return data;
    }

    async getDuels() {
        const duels = [];

        await axios.get('http://192.168.0.239:5000/duels').then(res => {
            duels.push(...res.data);
        })

        return duels;
    }

    async add(duel) {
        await axios.post('http://192.168.0.239:5000/duels/add', duel);
    }

}

export {
    DuelService
};