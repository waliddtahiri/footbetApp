import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

let duel = undefined;
class DuelsList extends Component {

    constructor(props) {
        super(props);
        this.updatePost = this.updatePost.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    setDueltoParent(duel) {
        this.props.setDuel(duel);
    }

    updatePost(duel) {
        this.props.updateDuel(duel);
    }

    render() {
        const { posts, navigation} = this.props;

        const duels = posts.map(post => {
            duel = post.duel;
            return (
                <TouchableOpacity key={post.duel._id}
                    onPress={() => {
                        this.setDueltoParent(post.duel);
                        navigation.navigate('Challenge',
                            {
                                duel: post.duel, challenge: post.duel.challenged,
                                update: () => this.updatePost(post.duel)
                            });
                    }}>
                    <Card>
                        <Text>MATCH : {duel.match.homeTeam} VS {duel.match.awayTeam}{"\n"}</Text>
                        <Text>CHALLENGER : {post.opponent.username.toUpperCase()}{"\n"}</Text>
                        <Text>BETTING : {duel.challenged.betting} COINS</Text>
                    </Card>
                </TouchableOpacity>
            )
        })
        return (
            <View>{duels}</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    rowWinner: {
        marginTop: 1,
        padding: 5,
        backgroundColor: '#00FF00',
    },
    rowLoser: {
        marginTop: 1,
        padding: 5,
        backgroundColor: '#FF0000',
    },
    text: {
        color: '#ffffff',
        fontSize: 15
    }
});

export default DuelsList;
