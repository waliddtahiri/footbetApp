import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AllScreens from './src/navigation';

import { Provider } from 'react-redux';
import store from './src/store';
import { loadUser } from './src/actions/authActions';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AllScreens />
        </NavigationContainer>
      </Provider >
    )
  }
}

export default App;