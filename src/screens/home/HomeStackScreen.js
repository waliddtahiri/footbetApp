import React, { Component } from 'react';
import {
    Home, ChallengeScore
} from '.';
import { TouchableHighlight } from 'react-native';

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
                            // <Button
                            //     onPress={() => props.logout()}
                            //     title="Logout"
                            // />
                            <TouchableHighlight onPress={() => this.props.logout()}>
                                <MaterialCommunityIcons name="logout" size={26} />
                            </TouchableHighlight>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { logout })(HomeStackScreen);