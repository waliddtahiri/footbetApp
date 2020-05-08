import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

export const BetRows = ({ posts }) => {
    const bets = posts.map(post => {
        return (
            <View>
                {post.match.winner != post.winner ? (
                    <View key={post._id} style={styles.rowLoser}>
                        <Text>MATCH : {post.match.homeTeam} VS {post.match.awayTeam}{"\n"}</Text>
                        {post.match.winner == "HOME_TEAM" ? (
                            <Text>RESULT : {post.match.homeTeam} WINS{"\n"}</Text>
                        ) : (post.match.winner == "AWAY_TEAM" ? (
                            <Text>RESULT : {post.match.awayTeam} WINS{"\n"}</Text>
                        ) : (
                                <Text>RESULT : DRAW {"\n"}</Text>
                            )
                            )
                        }
                        <Text>BETTING : {post.betting} COINS</Text>
                    </View>) : (
                        <View key={post._id} style={styles.rowWinner}>
                            <Text>MATCH : {post.match.homeTeam} VS {post.match.awayTeam}{"\n"}</Text>
                            {post.match.winner == "HOME_TEAM" ? (
                                <Text>RESULT : {post.match.homeTeam} WINS{"\n"}</Text>
                            ) : (post.match.winner == "AWAY_TEAM" ? (
                                <Text>RESULT : {post.match.awayTeam} WINS{"\n"}</Text>
                            ) : (
                                    <Text>RESULT : DRAW {"\n"}</Text>
                                )
                                )
                            }
                            <Text>BETTING : {post.betting} COINS</Text>
                        </View>
                    )
                }
            </View>
        )
    })
    return (
        <View>{bets}</View>
    )
}


export const DuelRows = ({ posts, navigation }) => {
    const updatePost = (duel) => {
        this.props.updateDuel(duel);
    }
    const duels = posts.map(post => {
        return (
            <TouchableOpacity key={post.duel._id}
                onPress={() => navigation.navigate('Challenge',
                 { duel: post.duel, challenge: post.duel.challenged, update: updatePost(post.duel) })}>
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
        paddingTop: 40
    },
    rowWinner: {
        marginTop: 1,
        padding: 5,
        backgroundColor: '#00FF00'
    },
    rowLoser: {
        marginTop: 1,
        padding: 5,
        backgroundColor: '#FF0000'
    }
});
