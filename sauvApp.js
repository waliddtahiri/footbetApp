import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, HomeScreen, MatchesScreen, BetScreen } from './src/screens';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MatchesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="Betting" component={BetScreen} />
    </Stack.Navigator>
  );
}

const logged = false;

class App extends React.Component {
  render() {
    if (logged === false) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Matches" component={MatchesStackScreen} />
            </Tab.Navigator >
          </NavigationContainer >
        </Provider>
      )
    }
  }
}

export default App;