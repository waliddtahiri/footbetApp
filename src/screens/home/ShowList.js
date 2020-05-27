import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

import axios from 'axios';


export const BetCurrentRows = ({ posts }) => {
    const bets = posts.map(post => {
        return (
            <View>
                <View key={post._id} style={styles.rowNormal}>
                    <Text>MATCH : {post.match.homeTeam} VS {post.match.awayTeam}{"\n"}</Text>
                    <View>
                        {post.winner == "HOME_TEAM" ? (
                            <Text>YOU BET ON : {post.match.homeTeam}{"\n"}</Text>
                        ) : (post.winner == "AWAY_TEAM" ? (
                            <Text>YOU BET ON : {post.match.awayTeam}{"\n"}</Text>
                        ) : (
                                <Text>YOU BET ON : DRAW{"\n"}</Text>
                            )
                            )
                        }
                    </View>
                    <Text>BETTING : {post.betting} COINS</Text>
                </View>
            </View>
        )
    })
    return (
        <View>{bets}</View>
    )
}

export const BetRows = ({ posts }) => {
    const bets = posts.map(post => {
        return (
            <View>
                {post.match.winner != post.winner ? (
                    <View key={post._id} style={styles.rowLoser}>
                        <Text>MATCH : {post.match.homeTeam} {post.match.homeScore} - {post.match.awayScore} {post.match.awayTeam}{"\n"}</Text>
                        {post.match.winner == "HOME_TEAM" ? (
                            <Text>RESULT : {post.match.homeTeam} WINS{"\n"}</Text>
                        ) : (post.match.winner == "AWAY_TEAM" ? (
                            <Text>RESULT : {post.match.awayTeam} WINS{"\n"}</Text>
                        ) : (
                                <Text>RESULT : DRAW {"\n"}</Text>
                            )
                            )
                        }
                        <View>
                            {post.winner == "HOME_TEAM" ? (
                                <Text>YOU BET ON : {post.match.homeTeam}{"\n"}</Text>
                            ) : (post.winner == "AWAY_TEAM" ? (
                                <Text>YOU BET ON : {post.match.awayTeam}{"\n"}</Text>
                            ) : (
                                    <Text>YOU BET ON : DRAW{"\n"}</Text>
                                )
                                )
                            }
                        </View>
                        <View>
                            <Text>BETTING : {post.betting} COINS</Text>
                        </View>
                    </View>) : (
                        <View key={post._id} style={styles.rowWinner}>
                            <Text>MATCH : {post.match.homeTeam} {post.match.homeScore} - {post.match.awayScore} {post.match.awayTeam}{"\n"}</Text>
                            {post.match.winner == "HOME_TEAM" ? (
                                <View>
                                    <Text>RESULT : {post.match.homeTeam} WINS{"\n"}</Text>
                                    <Text>YOU BET ON : {post.match.homeTeam}{"\n"}</Text>
                                </View>
                            ) : (post.match.winner == "AWAY_TEAM" ? (
                                <View>
                                    <Text>RESULT : {post.match.awayTeam} WINS{"\n"}</Text>
                                    <Text>YOU BET ON : {post.match.awayTeam}{"\n"}</Text>
                                </View>
                            ) : (
                                    <View>
                                        <Text>RESULT : DRAW {"\n"}</Text>
                                        <Text>YOU BET ON : DRAW{"\n"}</Text>
                                    </View>
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
                    <Text>BETTING : {post.betting}</Text>
                </Card>
            </TouchableOpacity>
        )
    })
    return (
        <View>{duels}</View>
    )
}

export const DuelRowsHistory = ({ player, posts }) => {
    const duels = posts.map(post => {
        console.log(post);
        if (post.duel.winner == player.username && post.player2.opponent.username == player.username) {
            return (
                <View key={post.duel._id} style={styles.rowWinner}>
                    <Text>Match : {post.duel.match.homeTeam} {post.duel.match.homeScore} - {post.duel.match.awayScore} {post.duel.match.awayTeam}{"\n"}</Text>
                    <Text>You won : {post.player1.betting * 2} Coins by betting on {post.player1.homeScore} - {post.player1.awayScore}{"\n"}</Text>
                    <Text>Against : "{post.player1.opponent.username}" who bet on {post.player2.homeScore} - {post.player2.awayScore}</Text>
                </View>
            )
        }
        if (post.duel.winner == player.username && post.player1.opponent.username == player.username) {
            return (
                <View key={post.duel._id} style={styles.rowWinner}>
                    <Text>Match : {post.duel.match.homeTeam} {post.duel.match.homeScore} - {post.duel.match.awayScore} {post.duel.match.awayTeam}{"\n"}</Text>
                    <Text>You won : {post.player2.betting * 2} Coins by betting on {post.player2.homeScore} - {post.player2.awayScore}{"\n"}</Text>
                    <Text>Against : "{post.player2.opponent.username}" who bet on {post.player1.homeScore} - {post.player1.awayScore}</Text>
                </View>
            )
        }

        if (post.duel.winner != player.username && post.duel.winner != "DRAW" && post.player2.opponent.username == player.username) {
            return (
                <View key={post.duel._id} style={styles.rowLoser}>
                    <Text>Match : {post.duel.match.homeTeam} {post.duel.match.homeScore} - {post.duel.match.awayScore} {post.duel.match.awayTeam}{"\n"}</Text>
                    <Text>You lost : {post.player1.betting} Coins by betting on {post.player1.homeScore} - {post.player1.awayScore}{"\n"}</Text>
                    <Text>Against : "{post.player1.opponent.username}" who bet on {post.player2.homeScore} - {post.player2.awayScore}</Text>
                </View>
            )
        }
        if (post.duel.winner != player.username && post.duel.winner != "DRAW" && post.player1.opponent.username == player.username) {
            return (
                <View key={post.duel._id} style={styles.rowLoser}>
                    <Text>Match : {post.duel.match.homeTeam} {post.duel.match.homeScore} - {post.duel.match.awayScore} {post.duel.match.awayTeam}{"\n"}</Text>
                    <Text>You lost : {post.player2.betting} Coins by betting on {post.player2.homeScore} - {post.player2.awayScore}{"\n"}</Text>
                    <Text>Against : "{post.player2.opponent.username}" who bet on {post.player1.homeScore} - {post.player1.awayScore}</Text>
                </View>
            )
        }
        if (post.duel.winner == "DRAW" && post.player2.opponent.username == player.username) {
            return (
                <View key={post.duel._id} style={styles.rowNormal}>
                    <Text>Match : {post.duel.match.homeTeam} {post.duel.match.homeScore} - {post.duel.match.awayScore} {post.duel.match.awayTeam}{"\n"}</Text>
                    <Text>Draw with: "{post.player1.opponent.username}" who bet on {post.player2.homeScore} - {post.player2.awayScore}{"\n"}</Text>
                    <Text>You bet on : {post.player1.homeScore} - {post.player1.awayScore}</Text>
                </View>
            )
        }
        if (post.duel.winner == "DRAW" && post.player1.opponent.username == player.username) {
            return (
                <View key={post.duel._id} style={styles.rowNormal}>
                    <Text>Match : {post.duel.match.homeTeam} {post.duel.match.homeScore} - {post.duel.match.awayScore} {post.duel.match.awayTeam}{"\n"}</Text>
                    <Text>Draw with: "{post.player2.opponent.username}" who bet on {post.player1.homeScore} - {post.player1.awayScore}{"\n"}</Text>
                    <Text>You bet on : {post.player2.homeScore} - {post.player2.awayScore}</Text>
                </View>
            )
        }
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
    },
    rowNormal: {
        marginTop: 1,
        padding: 5,
        backgroundColor: '#FFFFFF'
    }
});
