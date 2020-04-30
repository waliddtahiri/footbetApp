import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/bets';

class BetService {

    async get(bet) {
        const {data} = await axios.get('http://192.168.0.239:5000/bets/' + bet);

        return data;
    }
    
}

export {
    BetService
};