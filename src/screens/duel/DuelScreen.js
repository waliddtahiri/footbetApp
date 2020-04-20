import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { PlayerService } from '../../services/player.service';
import { DuelService } from '../../services/duel.service';

import { Dropdown } from 'react-native-material-dropdown';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    },
    text: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 70,
    }
});

const playerService = new PlayerService();
const duelService = new DuelService();

class DuelScreen extends Component {

    static defaultProps = {
        playerService,
        duelService
    }

    constructor() {
        super()
        this.state = {
            homeScore: 0,
            awayScore: 0,
            betting: 0,
            opponent: null,
            players: [],
            player2: null,
            duel: null,
            numero: null,
            show: true
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    async componentDidMount() {
        const array = [];
        const players = await this.props.playerService.getAll();
        players.forEach(player => {
            if (player.username != this.props.route.params.player.username) {
                array.push({ value: player.username })
            }
        });
        this.setState({
            players: array
        })
        console.log(this.state.players);
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    IncrementItem = () => {
        this.setState({ betting: this.state.betting + 10 });
    }

    DecreaseItem = () => {
        if (this.state.betting > 0) {
            this.setState({ betting: this.state.betting - 10 });
        }
    }

    IncrementHomeGoals = () => {
        this.setState({ homeScore: this.state.homeScore + 1 });
    }

    IncrementAwayGoals = () => {
        this.setState({ awayScore: this.state.awayScore + 1 });
    }

    DecreaseHomeGoals = () => {
        if (this.state.homeScore > 0) {
            this.setState({ homeScore: this.state.homeScore - 1 });
        }
    }

    DecreaseAwayGoals = () => {
        if (this.state.awayScore > 0) {
            this.setState({ awayScore: this.state.awayScore - 1 });
        }
    }

    ValiderDuel = async () => {
        const player = this.props.route.params.player;
        const player2 = this.state.player2;
        const match = this.props.route.params.match;

        let homeScore = this.state.homeScore;
        let awayScore = this.state.awayScore;
        let betting = this.state.betting;

        let challenger = {
            opponent: player2, match: match.info, homeScore,
            awayScore, betting, status: "Sent"
        };

        console.log(player2);
        //console.log(duelChallenger);
        //console.log(match.info);

        this.props.playerService.addDuel(player._id, challenger);

        //this.props.playerService.addDuelPlayer2(player2._id, duel);

        this.props.navigation.navigate('Matches');
    }


    render() {

        const player = this.props.route.params.player;
        const { homeTeam } = this.props.route.params.match;
        const { awayTeam } = this.props.route.params.match;
        const buttons = [homeTeam, 'Match Nul', awayTeam];
        const { selectedIndex } = this.state;

        const onChangeHandler = async (value) => {
            this.setState({
                opponent: value
            })
            let player2 = await this.props.playerService.getOne(this.state.opponent);
            this.setState({
                player2: player2
            })
        }

        return (
            <View style={styles.container}>
                <Dropdown
                    label='Opponent'
                    data={this.state.players}
                    onChangeText={value => onChangeHandler(value)}
                />
                <View style={styles.container2}>
                    <Text style={styles.text}>Score Domicile :</Text>
                    <Button title="+" onPress={this.IncrementHomeGoals} />
                    <Text style={styles.text}>{this.state.homeScore}</Text>
                    <Button title="-" onPress={this.DecreaseHomeGoals} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.text}>Score Extérieur :</Text>
                    <Button title="+" onPress={this.IncrementAwayGoals} />
                    <Text style={styles.text}>{this.state.awayScore}</Text>
                    <Button title="-" onPress={this.DecreaseAwayGoals} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.text}>Votre mise :</Text>
                    <Button title="+" onPress={this.IncrementItem} />
                    <Text style={styles.text}>{this.state.betting} coins</Text>
                    <Button title="-" onPress={this.DecreaseItem} />
                </View>
                <View style={styles.container2}>
                    <Button title="Valider Duel" onPress={this.ValiderDuel} />
                </View>
            </View>
        );
    }
}

export default DuelScreen;