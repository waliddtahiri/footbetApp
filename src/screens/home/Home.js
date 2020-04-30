import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { DuelService } from '../../services/duel.service';
import { PlayerService } from '../../services/player.service';

import { DuelRows } from './ShowList';
import { connect } from 'react-redux';

const duelService = new DuelService();
const playerService = new PlayerService();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duels: []
        }
    }

    async componentDidMount() {
        const array = [];
        const duels = await duelService.getDuels();
        duels.forEach(async (duel) => {
            let d = await duelService.getDuel(duel._id);
            let player = await playerService.getById(d.challenged.opponent);
            if (d.match.winner != "unknown" && this.props.player._id != player._id
                && d.challenged.status == "Received") {
                array.push({ duel: d, opponent: player });
            }
            this.setState({
                duels: array
            })
        })
    }

    render() {
        const { duels } = this.state;
        return (
            <ScrollView style={styles.container}>
                <DuelRows posts={duels} navigation={this.props.navigation} />
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
    text: {
        color: '#ffffff',
        fontSize: 15
    }

});

const mapStateToProps = state => ({
    player: state.auth.player,
});

export default connect(mapStateToProps)(Home);