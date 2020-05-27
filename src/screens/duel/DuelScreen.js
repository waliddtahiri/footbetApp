import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PlayerService } from '../../services/player.service';
import { DuelService } from '../../services/duel.service';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

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
    errorsContainer: {
        margin: 20,
        padding: 20,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,0,0,0.2)',
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
    btnText: {
        color: '#FFFFFF',
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
            visible: false,
            errors: []
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

    onPress = () => {
        this.setState({
            visible: false
        })
        this.props.navigation.goBack();
        this.props.navigation.goBack();
        this.props.navigation.navigate('Home');
    }

    ValiderDuel = async () => {
        const player = this.props.route.params.player;
        const player2 = this.state.player2;
        const match = this.props.route.params.match;

        let homeScore = this.state.homeScore;
        let awayScore = this.state.awayScore;
        let betting = this.state.betting;
        let errors = [];

        let challenger = {
            opponent: player2, match: match.info, homeScore,
            awayScore, betting, status: "Sent"
        };

        if (this.state.opponent == null) {
            let error = "- Veuillez sélectionner un adversaire"
            errors.push(error);
            this.setState({
                errors
            })
        }

        if (betting == 0) {
            let error = "- Veuillez sélectionner une somme à parier"
            errors.push(error);
            this.setState({
                errors
            })
        }

        if (betting > player.coins) {
            let error = "- Vous n'avez pas assez de COINS"
            errors.push(error);
            this.setState({
                errors
            })
        }

        if (this.state.opponent !== null && this.state.betting > 0 && this.state.betting <= player.coins) {
            player.coins = player.coins - this.state.betting;
            this.props.playerService.update(player._id, player);
            this.props.playerService.addDuel(player._id, challenger);
            
            this.setState({
                visible: true
            })
        }

    }


    render() {

        const player = this.props.route.params.player;
        const { homeTeam } = this.props.route.params.match;
        const { awayTeam } = this.props.route.params.match;
        const buttons = [homeTeam, 'Match Nul', awayTeam];
        const { selectedIndex } = this.state;

        const { errors } = this.state;
        const errorsList = errors.map((error, i) => {
            return (<Text key={i} style={styles.buttonText}>{error}</Text>)
        })

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
                <Text> COINS : {player.coins}</Text>
                <Dropdown
                    label='Opponent'
                    data={this.state.players}
                    onChangeText={value => onChangeHandler(value)}
                />
                <View style={styles.container2}>
                    <Text style={styles.text}>{homeTeam} :</Text>
                    <Button title="+" onPress={this.IncrementHomeGoals} />
                    <Text style={styles.text}>{this.state.homeScore}</Text>
                    <Button title="-" onPress={this.DecreaseHomeGoals} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.text}>{awayTeam} :</Text>
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
                {errors.length !== 0 ? (
                    <View style={styles.errorsContainer}>
                        {errorsList}
                    </View>
                ) : null}
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
                    <Text style={{ marginTop: -16, marginBottom: 32 }}>Vous avez provoqué {this.state.opponent} en Duel, votre demande lui sera communiqué </Text>
                    <TouchableOpacity style={styles.btn} onPress={() => this.onPress()}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </FancyAlert>
            </View>
        );
    }
}

export default DuelScreen;