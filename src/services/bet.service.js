import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/bets';

class BetService {


    async add(bet) {
        const {data} = await axios.post('http://192.168.0.239:5000/bets/add', bet);

        return data;
    }

}

export {
    BetService
};