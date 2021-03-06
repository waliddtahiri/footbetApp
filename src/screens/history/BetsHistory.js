import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { BetRows } from '../home/ShowList';

import { getBetsHistory } from '../../actions/betActions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class BetsHistory extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.getBetsHistory(this.props.player._id);
    }

    render() {
        const { betsHistory } = this.props.bet;
        console.log(betsHistory);
        return (
            betsHistory.length > 0 ?
                (<ScrollView style={styles.container}>
                    <BetRows posts={betsHistory} />
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

export default connect(mapStateToProps, { getBetsHistory })(BetsHistory);