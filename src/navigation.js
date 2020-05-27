import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
    Login, SignUp, BetsCurrent, Home, ChallengeScore, BetsHistory,
    MatchesScreen, BetScreen, DuelScreen, ModalChoice, DuelsHistory, HomeStackScreen
} from './screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, TouchableHighlight } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { logout } from './actions/authActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Mat = createMaterialTopTabNavigator();

const MatchesStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Matches" component={MatchesScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#ff1493',
                    }
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

// const HomeStackScreen = (props) => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Home" component={Home}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff1493',
//                     },
//                     headerRight: () => (
//                         // <Button
//                         //     onPress={() => props.logout()}
//                         //     title="Logout"
//                         // />
//                         <TouchableHighlight onPress={() => props.logout()}>
//                             <MaterialCommunityIcons name="logout" size={26} />
//                         </TouchableHighlight>
//                     )
//                 }} />
//             <Stack.Screen name="Challenge" component={ChallengeScore}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff1493',
//                     }
//                 }} />
//         </Stack.Navigator>
//     );
// }

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
            <Mat.Screen name="Historique Duels" component={DuelsHistory} />
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
                    // <Tab.Navigator>
                    //     <Tab.Screen name="Home" component={props => <HomeStackScreen {...props} logout={this.deconnexion} />} />
                    //     <Tab.Screen name="Matches" component={MatchesStackScreen} />
                    //     <Tab.Screen name="History" component={MatTab} />
                    // </Tab.Navigator >
                    <Tab.Navigator
                        initialRouteName="Home"
                        activeColor='#ff1493'
                        style={{ backgroundColor: 'tomato' }}
                    >
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