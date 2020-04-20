import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, HomeScreen, MatchesScreen, BetScreen } from '../screens';

const Stack = createStackNavigator();
function MatchesStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Matches" component={MatchesScreen} />
            <Stack.Screen name="Betting" component={BetScreen} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Matches" component={MatchesStackScreen} />
    </Tab.Navigator >
}


export default AppNavigation = (authenticated) => TabScreen();