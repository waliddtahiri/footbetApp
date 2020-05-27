import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { BetCurrentRows } from '../home/ShowList';

import { getBetsCurrent, getBetsHistory } from '../../actions/betActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class BetsCurrent extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.getBetsCurrent(this.props.player._id);
    }

    render() {
        const { bets } = this.props.bet;
        return (
            bets.length > 0 ?
            (<ScrollView style={styles.container}>
                <BetCurrentRows posts={bets} />
             </ScrollView>) : (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Aucun pari à afficher</Text>
                </View>
            )
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
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#384259',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const mapStateToProps = state => ({
    player: state.auth.player,
    bet: state.bet
});

export default connect(mapStateToProps, { getBetsCurrent })(BetsCurrent);