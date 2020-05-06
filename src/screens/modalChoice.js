import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NestedListView, { NestedRow } from 'react-native-nested-listview'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    row: {
        marginTop: 24,
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ff1493',
        alignItems: 'center'
    },
    text: {
        color: '#ffffff',
        fontSize: 15
    }

});

class ModalChoice extends Component {

    pressedItem(item) {
        const player = this.props.route.params.player;
        const match = this.props.route.params.match;

        if (item.title == "Parier") {
            this.props.navigation.navigate('Betting', { match: match, player: player })
        }
        if (item.title == "Duel") {
            this.props.navigation.navigate('Duel', { match: match, player: player })
        }
    }

    render() {

        const data = [{ title: 'PARIER    (mode Solo)' }, { title: 'DUEL    (défier un autre joueur)' }];

        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress = {() => this.pressedItem(item)}>
                            <Card>
                                <Text>{item.title}</Text>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}


export default ModalChoice;