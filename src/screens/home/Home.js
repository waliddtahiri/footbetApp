import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { DuelService } from '../../services/duel.service';
import { PlayerService } from '../../services/player.service';

import { BetCurrentRows } from './ShowList';
import DuelsList from './DuelsList';

import { getBets } from '../../actions/betActions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const duelService = new DuelService();
const playerService = new PlayerService();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duels: [],
            duel: undefined
        }
        this.updateDuel = this.updateDuel.bind(this);
        this.setDuel = this.setDuel.bind(this);
    }

    setDuel(duel) {
        this.setState({
            duel
        })
    }

    updateDuel(duel) {
        const filterDuels = this.state.duels.filter(d => d.duel._id !== duel._id);
        console.log(filterDuels);
        this.setState({
            duels: filterDuels
        })
    }

    async componentDidMount() {
        const array = [];
        const duels = await duelService.getDuels();
        duels.forEach(async (duel) => {
            let d = await duelService.getDuel(duel._id);
            let player = await playerService.getById(d.challenged.opponent);
            if (d.match.winner == "unknown" && this.props.player._id != player._id
                && d.challenged.status == "Received") {
                array.push({ duel: d, opponent: player });
            }
            this.setState({
                duels: array
            })
        })
    }

    render() {
        const { duels} = this.state;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Bienvenue {this.props.player.username}, {"\n"}</Text>
                {this.state.duels.length !== 0 ? (
                    <DuelsList posts={duels} setDuel={this.setDuel} navigation={this.props.navigation} updateDuel={this.updateDuel} />
                ) : (
                        <Text style={styles.text}>Pas de notifications</Text>
                    )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    row: {
        marginTop: 24,
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ff1493',
        alignItems: 'center'
    },
    title: {
        color: '#ffffff',
        fontSize: 40
    },
    text: {
        color: '#ffffff',
        fontSize: 25
    }

});

Home.propTypes = {
    getBets: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    player: state.auth.player,
    bet: state.bet
});

export default connect(mapStateToProps, { getBets })(Home);