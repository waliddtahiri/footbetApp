import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, HomeScreen, MatchesScreen, BetScreen, DuelScreen, ModalChoice } from './screens';
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
            <Stack.Screen name="Modal" component={ModalChoice} />
            <Stack.Screen name="Betting" component={BetScreen} />
            <Stack.Screen name="Duel" component={DuelScreen} />
        </Stack.Navigator>
    );
}

const MatTab2 = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="Victoires" component={HomeScreen} />
            <Mat.Screen name="Defaites" component={HomeScreen} />
            <Mat.Screen name="En Cours" component={HomeScreen} />
        </Mat.Navigator>
    );
}

const MatTab = () => {
    return (
        <Mat.Navigator>
            <Mat.Screen name="Paris solos" component={HomeScreen} />
            <Mat.Screen name="Challenges" component={MatTab2} />
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
                    </Stack.Navigator>
                ) : (
                        <Tab.Navigator>
                            <Tab.Screen name="Home" component={MatTab} />
                            <Tab.Screen name="Matches" component={MatchesStackScreen} />
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