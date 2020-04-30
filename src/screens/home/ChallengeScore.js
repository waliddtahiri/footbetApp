import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { PlayerService } from '../../services/player.service';
import { ChallengeService } from '../../services/challenge.service';


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
const challengeService = new ChallengeService();

class ChallengeScore extends Component {

    static defaultProps = {
        playerService,
        challengeService
    }

    constructor(props) {
        super(props);
        this.state = {
            homeScore: 0,
            awayScore: 0,
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
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

    ValiderChallenge = async () => {
        let homeScore = this.state.homeScore;
        let awayScore = this.state.awayScore;
        const challenge = this.props.route.params.challenge;

        challenge.homeScore = homeScore;
        challenge.awayScore = awayScore;

        await challengeService.update(challenge._id, challenge);

        this.props.navigation.navigate('Home');
    }


    render() {
        return (
            <View style={styles.container}>
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
                    <Button title="Accepter Challenge" onPress={this.ValiderChallenge} />
                </View>
            </View>
        );
    }
}

export default ChallengeScore;