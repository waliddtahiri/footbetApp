import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { BetService } from '../../services/bet.service';

import { BetCurrentRows } from '../home/ShowList';

import { getBets } from '../../actions/betActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const betService = new BetService();

class BetsCurrent extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.getBets(this.props.player._id);
    }

    render() {
        const { bets } = this.props.bet;
        return (
            <ScrollView style={styles.container}>
                <BetCurrentRows posts={bets} />
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

BetsCurrent.propTypes = {
    getBets: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    player: state.auth.player,
    bet: state.bet
});

export default connect(mapStateToProps, { getBets })(BetsCurrent);