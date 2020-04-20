import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { PlayerService } from '../../services/player.service';
import { BetService } from '../../services/bet.service';

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
const betService = new BetService();

class BetScreen extends Component {

    static defaultProps = {
        playerService,
        betService
    }

    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            homeScore: 0,
            awayScore: 0,
            betting: 0,
            show: true
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    async componentDidMount() {
        const player = await this.props.playerService.getOne(this.props.route.params.player.username);
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

    ValiderPanier = async () => {
        const player = this.props.route.params.player;
        const match = this.props.route.params.match;
        const { homeTeam } = match;
        const { awayTeam } = match;
        const buttons = [homeTeam, 'Match Nul', awayTeam];
        const { selectedIndex } = this.state;

        let homeScore = this.state.homeScore;
        let awayScore = this.state.awayScore;
        let betting = this.state.betting;
        let winner = buttons[selectedIndex];

        if (this.state.selectedIndex >= 0 && betting !== 0 && betting <= player.coins) {
            let bet = { match: match.info, homeScore, awayScore, winner, betting };

            //console.log(bet);
            console.log(this.props.playerService.addBet(player._id, bet));
            this.props.navigation.navigate('Matches');
        }
    }

    render() {

        const player = this.props.route.params.player;
        const { homeTeam } = this.props.route.params.match;
        const { awayTeam } = this.props.route.params.match;
        const buttons = [homeTeam, 'Match Nul', awayTeam];
        const { selectedIndex } = this.state;

        return (
            <View style={styles.container}>
                <Text> COINS : {player.coins}</Text>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 100 }}
                />
                <Text style={styles.text}>{'Votre pariez sur : ' + buttons[selectedIndex]}</Text>
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
                    <Button title="Valider Pari" onPress={this.ValiderPanier} />
                </View>
            </View>
        );
    }
}

export default BetScreen;