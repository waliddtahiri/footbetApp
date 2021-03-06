import React, { Component } from 'react';
import {
    Home, ChallengeScore
} from '.';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

class HomeStackScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}
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
                    }} />
                <Stack.Screen name="Challenge" component={ChallengeScore}
                    options={{
                        headerStyle: {
                            backgroundColor: '#ff1493',
                        }
                    }} />
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

export default connect(mapStateToProps, { logout })(HomeStackScreen);