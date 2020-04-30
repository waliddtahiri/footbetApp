import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

export const BetRows = ({ posts }) => {
    const bets = posts.map(post => {
        return (
            <View key={post._id} style={styles.row}>
                <Text>MATCH : {post.match.homeTeam} VS {post.match.awayTeam}{"\n"}</Text>
                <Text>WINNER PREDICTED : {post.winner}{"\n"}</Text>
                <Text>BETTING : {post.betting}{"\n"}</Text>
            </View>
        )
    })
    return (
        <View>{bets}</View>
    )
}

export const DuelRows = ({ posts, navigation }) => {
    const duels = posts.map(post => {
        return (
                <TouchableOpacity key={post.duel._id} 
                    onPress={() => navigation.navigate('Challenge', { challenge: post.duel.challenged })}>
                    <Card>
                        <Text>MATCH : {post.duel.match.homeTeam} VS {post.duel.match.awayTeam}{"\n"}</Text>
                        <Text>CHALLENGER : {post.opponent.username.toUpperCase()}{"\n"}</Text>
                    </Card>
                </TouchableOpacity>
        )
    })
    return (
        <View>{duels}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    row: {
        marginTop: 1,
        padding: 5,
        backgroundColor: '#FFFAF0',

    },
    text: {
        color: '#ffffff',
        fontSize: 15
    }
});
