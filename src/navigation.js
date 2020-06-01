import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
    Login, SignUp, BetsCurrent, BetsHistory, MatchesScreen, BetScreen, DuelScreen, ModalChoice,
    DuelsCurrent, DuelsHistory, HomeStackScreen, MatchesStackScreen
} from './screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableHighlight } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { logout } from './actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Mat = createMaterialTopTabNavigator();

const MatTabBet = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="En cours" component={BetsCurrent} />
            <Mat.Screen name="Historique" component={BetsHistory} />
        </Mat.Navigator>
    );
}

const MatTabDuels = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="En cours" component={DuelsCurrent} />
            <Mat.Screen name="Historique" component={DuelsHistory} />
        </Mat.Navigator>
    );
}

const MatTab = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="Paris" component={MatTabBet} />
            <Mat.Screen name="Duels" component={MatTabDuels} />
        </Mat.Navigator>
    );
}

class AllScreens extends Component {

    constructor(props) {
        super(props);
        this.deconnexion = this.deconnexion.bind(this);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        logout: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    deconnexion() {
        console.log(this.props);
        this.props.logout();
    }


    render() {
        return (
            !this.props.isAuthenticated == true ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            ) : (
                    <Tab.Navigator
                        initialRouteName="Home"
                        activeColor='#ff1493'
                        style={{ backgroundColor: 'tomato' }}>
                        <Tab.Screen
                            name="Home"
                            component={HomeStackScreen}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarColor: '#ff1493',
                                tabBarIcon: ({ color }) => (
                                    <MaterialCommunityIcons name="home" color={color} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Matches"
                            component={MatchesStackScreen}
                            options={{
                                tabBarLabel: 'Matches',
                                tabBarColor: '#ff1493',
                                tabBarIcon: ({ color }) => (
                                    <MaterialCommunityIcons name="soccer" color={color} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="History"
                            component={MatTab}
                            options={{
                                tabBarLabel: 'History',
                                tabBarColor: '#ff1493',
                                tabBarIcon: ({ color }) => (
                                    <MaterialCommunityIcons name="history" color={color} size={26} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                )
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { logout })(AllScreens);