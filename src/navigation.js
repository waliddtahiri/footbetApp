import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Login, SignUp, BetsCurrent, Home, ChallengeScore, BetsHistory,
    MatchesScreen, BetScreen, DuelScreen, ModalChoice
} from './screens';
import Test from './test';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Mat = createMaterialTopTabNavigator();

const MatchesStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Matches" component={MatchesScreen} />
            <Stack.Screen name="Jouer" component={ModalChoice} />
            <Stack.Screen name="Betting" component={BetScreen} />
            <Stack.Screen name="Duel" component={DuelScreen} />
        </Stack.Navigator>
    );
}

const HomeStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Challenge" component={ChallengeScore} />
        </Stack.Navigator>
    );
}

const MatTab1 = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="En cours" component={BetsCurrent} />
            <Mat.Screen name="Historique" component={BetsHistory} />
        </Mat.Navigator>
    );
}

const MatTab = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="Paris Solo" component={MatTab1} />
            <Mat.Screen name=" Historique Duels" component={Test} />
        </Mat.Navigator>
    );
}

class AllScreens extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired
    }

    render() {
        return (
            <NavigationContainer>
                {!this.props.isAuthenticated == true ? (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </Stack.Navigator>
                ) : (
                        <Tab.Navigator>
                            <Tab.Screen name="Home" component={HomeStackScreen} />
                            <Tab.Screen name="Matches" component={MatchesStackScreen} />
                            <Tab.Screen name="History" component={MatTab} />
                        </Tab.Navigator >
                    )
                }
            </NavigationContainer >
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps)(AllScreens);