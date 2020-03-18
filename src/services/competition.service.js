import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/competitions';

class CompetitionService {

    async getId(i) {
        let competitions = [];

        await axios.get('http://192.168.0.239:5000/competitions/all').then(res => {
            competitions.push(...res.data);
        })

        return competitions[i];
    }

    async fetchCompetitionMatchesSA() {
        const id = await this.getId(0);

        const { data } = await axios.get(`http://192.168.0.239:5000/competitions/${id}`)

        return data;
    }

    async fetchCompetitionMatchesLiga() {
        const id = await this.getId(1);

        const { data } = await axios.get(`http://192.168.0.239:5000/competitions/${id}`)

        return data;
    }
}

export {
    CompetitionService
};