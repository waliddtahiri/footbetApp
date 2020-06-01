import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { DuelRowsCurrent } from '../home/ShowList';

import { getDuelsCurrent } from '../../actions/duelActions';
import { connect } from 'react-redux';


class DuelsCurrent extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.getDuelsCurrent(this.props.player.username);
    }

    render() {
        const { duels } = this.props.duel;
        return (
            duels.length > 0 ?
                (<ScrollView style={styles.container}>
                    <DuelRowsCurrent player={this.props.player} posts={duels} />
                 </ScrollView>) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Aucun duel à afficher</Text>
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
        color: '#ffffff'
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
    duel: state.duel
});

export default connect(mapStateToProps, { getDuelsCurrent })(DuelsCurrent);