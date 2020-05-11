import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/challenges';

class ChallengeService {

    async getChallenge(id) {
        const { data } = await axios.get(`http://192.168.0.239:5000/challenges/${id}`);

        return data;
    }

    async update(id, challenge) {
        await axios.put('http://192.168.0.239:5000/challenges/update/' + id, challenge)
            .then(res => {
                console.log(res);
            }).catch(error => console.log(error));
    }

    async decline(id, challenge) {
        await axios.put('http://192.168.0.239:5000/challenges/decline/' + id, challenge)
            .then(res => {
                console.log(res);
            }).catch(error => console.log(error));
    }

}

export {
    ChallengeService
};