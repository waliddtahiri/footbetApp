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
import { Button } from 'react-native';
import { logout } from './actions/authActions';

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

const HomeStackScreen = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => props.logout()}
                            title="Logout"
                        />
                    )
                }} />
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
            <Mat.Screen name="Historique Duels" component={Test} />
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
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={props => <HomeStackScreen {...props} logout={this.deconnexion}/>} />
                        <Tab.Screen name="Matches" component={MatchesStackScreen} />
                        <Tab.Screen name="History" component={MatTab} />
                    </Tab.Navigator >
                )
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { logout })(AllScreens);