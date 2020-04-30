import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { BetService } from '../../services/bet.service';

import { BetRows } from './ShowList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const betService = new BetService();

class BetWon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bets: []
        }
    }

    async componentDidMount() {
        const bets = [];
        let pari = undefined;
        this.props.player.bet.forEach(async (bet) => {
            pari = await betService.get(bet);
            if (pari.match.winner == pari.winner) {
                bets.push(pari);
            }
            this.setState({
                bets
            })
        });
    }

    render() {
        const { bets } = this.state;
        return (
            <ScrollView style={styles.container}>
                <BetRows posts={bets} />
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

export default connect(mapStateToProps)(BetWon);