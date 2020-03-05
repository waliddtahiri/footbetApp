import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    },
    text: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 70,
    }
});

class BetScreen extends Component {

    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            goaldiff: 0,
            betting: 0,
            show: true
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    IncrementItem = () => {
        this.setState({ betting: this.state.betting + 10 });
    }

    DecreaseItem = () => {
        if (this.state.betting > 0) {
            this.setState({ betting: this.state.betting - 10 });
        }
    }

    IncrementGoals = () => {
        this.setState({ goaldiff: this.state.goaldiff + 1 });
    }

    DecreaseGoals = () => {
        if (this.state.goaldiff > 0) {
            this.setState({ goaldiff: this.state.goaldiff - 1 });
        }
    }

    ValiderPanier = () => {
        if (this.state.selectedIndex >= 0 && this.state.goaldiff !== 0 && this.state.betting !== 0){
            console.log(this.state.betting * this.state.goaldiff)
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        console.log(this.props.route.params)
        const { homeTeam } = this.props.route.params.match;
        const { awayTeam } = this.props.route.params.match;
        const buttons = [homeTeam, 'Match Nul', awayTeam];
        const { selectedIndex } = this.state;

        return (
            <View style={styles.container}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 100 }}
                />
                <Text style={styles.text}>{'Votre pariez sur : ' + buttons[selectedIndex]}</Text>
                <View style={styles.container2}>
                    <Text style={styles.text}>Nombre de buts d'écart :</Text>
                    <Button title="+" onPress={this.IncrementGoals} />
                    <Text style={styles.text}>{this.state.goaldiff} goals</Text>
                    <Button title="-" onPress={this.DecreaseGoals} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.text}>Votre mise :</Text>
                    <Button title="+" onPress={this.IncrementItem} />
                    <Text style={styles.text}>{this.state.betting} coins</Text>
                    <Button title="-" onPress={this.DecreaseItem} />
                </View>
                <View style={styles.container2}>
                    <Button title="Valider Pari" onPress={this.ValiderPanier} />
                </View>
            </View>
        );
    }
}

export default BetScreen;