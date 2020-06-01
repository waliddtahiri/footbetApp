import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {MatchesScreen, BetScreen, DuelScreen, ModalChoice} from '../../screens';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';


const Stack = createStackNavigator();

class MatchesStackScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Matches" component={MatchesScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#ff1493',
                        },
                        headerRight: () => (
                            <View style={styles.row}>
                                <View style={styles.coins}>
                                    <Text style={styles.text}>{this.props.player.coins}</Text>
                                    <MaterialCommunityIcons name="coins" size={15} />
                                </View>
                                <TouchableHighlight onPress={() => this.props.logout()}>
                                    <MaterialCommunityIcons name="logout" size={26} />
                                </TouchableHighlight>
                            </View>
                        )
                    }}
                />
                <Stack.Screen name="Jouer" component={ModalChoice}
                    options={{
                        headerStyle: {
                            backgroundColor: '#ff1493',
                        }
                    }}
                />
                <Stack.Screen name="Betting" component={BetScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#ff1493',
                        }
                    }}
                />
                <Stack.Screen name="Duel" component={DuelScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#ff1493',
                        }
                    }}
                />
            </Stack.Navigator>
        );
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        marginRight: 5
    },
    coins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 280
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    player: state.auth.player,
    error: state.error
});

export default connect(mapStateToProps, { logout })(MatchesStackScreen);