import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, HomeScreen, MatchesScreen, BetScreen } from './src/screens';

import AllScreens from './src/navigation';

import { Provider } from 'react-redux';
import store from './src/store';
import { loadUser } from './src/actions/authActions';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MatchesStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="Betting" component={BetScreen} />
    </Stack.Navigator>
  );
}


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AllScreens />
      </Provider >
    )
  }
}

export default App;