import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/duels';

class DuelService {

    async getDuel(numero) {
        const {data} = await axios.get(`http://192.168.0.239:5000/duels/${numero}`);

        return data;
    }

    async add(duel) {
        await axios.post('http://192.168.0.239:5000/duels/add', duel);
    }

}

export {
    DuelService
};