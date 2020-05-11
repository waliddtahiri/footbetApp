import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PlayerService } from '../../services/player.service';
import { ChallengeService } from '../../services/challenge.service';

import { FancyAlert } from 'react-native-expo-fancy-alerts';


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
    },
    btn: {
        borderRadius: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        alignSelf: 'stretch',
        backgroundColor: '#4CB748',
        marginTop: 16,
        minWidth: '50%',
        paddingHorizontal: 16,
    },
    btnDecline: {
        borderRadius: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        alignSelf: 'stretch',
        backgroundColor: '#FF0000',
        marginTop: 16,
        minWidth: '50%',
        paddingHorizontal: 16,
    },
    btnText: {
        color: '#FFFFFF',
    }
});

const playerService = new PlayerService();
const challengeService = new ChallengeService();

class ChallengeScore extends Component {

    static defaultProps = {
        playerService,
        challengeService
    }

    componentDidMount(){
        console.log(this.props.route.params);
    }

    constructor(props) {
        super(props);
        this.state = {
            homeScore: 0,
            awayScore: 0,
            visible: false,
            decline: false
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

    onPress = () => {
        this.setState({
            visible: false
        })
        this.props.route.params.update();
        this.props.navigation.navigate('Home');
    }

    decline = () => {
        this.setState({
            decline: false
        })
        this.props.route.params.update();
        this.props.navigation.navigate('Home');
    }

    ValiderChallenge = async () => {
        let homeScore = this.state.homeScore;
        let awayScore = this.state.awayScore;
        const challenge = this.props.route.params.challenge;
        const player = this.props.route.params.player;

        player.coins = player.coins - challenge.betting;

        challenge.homeScore = homeScore;
        challenge.awayScore = awayScore;

        await playerService.update(player._id, player);
        await challengeService.update(challenge._id, challenge);
        this.setState({
            visible: true
        })     
    }

    DeclineChallenge = async() => {
        const challenge = this.props.route.params.challenge;

        await challengeService.decline(challenge._id, challenge);
        this.setState({
            decline: true
        })     
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
                <View style={styles.container2}>
                    <Button title="Refuser Challenge" onPress={this.DeclineChallenge} />
                </View>
                <FancyAlert
                    visible={this.state.visible}
                    icon={<View style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        width: '100%',
                    }}><Text>🤓</Text></View>}
                    style={{ backgroundColor: 'white' }}
                >
                    <Text style={{ marginTop: -16, marginBottom: 32 }}>Vous avez accepté le challenge ! </Text>
                    <TouchableOpacity style={styles.btn} onPress={() => this.onPress()}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </FancyAlert>
                <FancyAlert
                    visible={this.state.decline}
                    icon={<View style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        width: '100%',
                    }}><Text>🤓</Text></View>}
                    style={{ backgroundColor: 'white' }}
                >
                    <Text style={{ marginTop: -16, marginBottom: 32 }}>Vous avez refusé le challenge ... </Text>
                    <TouchableOpacity style={styles.btnDecline} onPress={() => this.decline()}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </FancyAlert>
            </View>
        );
    }
}

export default ChallengeScore;