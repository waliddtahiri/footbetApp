import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { PlayerService } from '../../services/player.service';
import { BetService } from '../../services/bet.service';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import { connect } from 'react-redux';
import { addBet } from '../../actions/betActions'

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
            errors: [],
            visible: false
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

    onPress = () => {
        this.setState({
            visible: false
        })
        this.props.navigation.goBack();
        this.props.navigation.goBack();
        this.props.navigation.navigate('Home');
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
        let winner = ' ';
        let errors = [];

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

        if (this.state.selectedIndex >= 0 && betting !== 0 && betting <= player.coins) {

            if (selectedIndex === 0) {
                winner = "HOME_TEAM"
            }
            else if (selectedIndex === 1) {
                winner = "DRAW"
            }
            else if (selectedIndex === 2) {
                winner = "AWAY_TEAM"
            }

            player.coins = player.coins - betting;

            let bet = { match: match.info, homeScore, awayScore, winner, betting };
            console.log(bet);
            this.props.playerService.addBet(player._id, bet);

            this.props.addBet(bet);

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
                    <Text style={styles.text}>Votre mise :</Text>
                    <Button title="+" onPress={this.IncrementItem} />
                    <Text style={styles.text}>{this.state.betting} coins</Text>
                    <Button title="-" onPress={this.DecreaseItem} />
                </View>
                <View style={styles.container2}>
                    <Button title="Valider Pari" onPress={this.ValiderPanier} />
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
                    <Text style={{ marginTop: -16, marginBottom: 32 }}>Votre pari a été validé, vous pouvez consulter la liste de vos paris actifs dans l'onglet 'Historique/Paris solo'</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => this.onPress()}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </FancyAlert>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    bets: state.bet.bets
})

export default connect(mapStateToProps, { addBet })(BetScreen);