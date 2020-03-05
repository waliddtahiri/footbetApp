import React, { Component } from 'react';
import { BetScreen } from '../betting';
import { View, Text, StyleSheet, Image } from 'react-native';
import NestedListView, { NestedRow } from 'react-native-nested-listview'
import { MatchApi } from '../../../api';
import { LoadingScreen } from '../../commons';
import { withTheme } from 'react-native-elements';


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

const matchApi = new MatchApi();

class HomeScreen extends Component {
    static defaultProps = {
        matchApi
    }

    state = {
        loading: false,
        matchsSA: [],
        matchsLiga: []
    }

    async componentDidMount() {
        this.setState({ loading: true });
        const postsSA = await this.props.matchApi.fetchCompetitionMatchesSA();
        console.log(postsSA);
        const postsLiga = await this.props.matchApi.fetchCompetitionMatchesLiga();
        this.setState({ loading: false, matchsSA: postsSA, matchsLiga: postsLiga });
    }


    render() {

        const postsSA = [];
        const postsLiga = [];

        this.state.matchsSA.forEach(match => {
            postsSA.push({
                title: `${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`,
                homeTeam: match.homeTeam, awayTeam: match.awayTeam
            })
        });
        this.state.matchsLiga.forEach(match => {
            postsLiga.push({
                title: `${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`,
                homeTeam: match.homeTeam, awayTeam: match.awayTeam
            })
        });

        const data = [{ title: 'Serie A', matchs: postsSA, logo: 'https://upload.wikimedia.org/wikipedia/fr/8/89/SerieALogo.png' },
        { title: 'Liga', matchs: postsLiga, logo: 'https://banner2.cleanpng.com/20180716/rbh/kisspng-segunda-divisin-201617-la-liga-spain-premier-la-liga-5b4cda9b090396.3229595515317633550369.jpg' }];

        return (
            <View style={styles.container}>
                <NestedListView
                    data={data}
                    getChildrenName={(node) => 'matchs'}
                    onNodePressed={(node) => {
                        if (node.title !== 'Serie A' && node.title !== 'Liga') {
                            this.props.navigation.navigate('Betting', { match: node })
                        }
                    }
                    }
                    renderNode={(node, level) => (
                        <NestedRow
                            level={level}
                            style={styles.row}
                        >
                            <Image source={{ uri: node.logo }} style={{ width: 40, height: 50 }} />
                            <Text style={styles.text}>{node.title}</Text>
                        </NestedRow>
                    )}
                />
            </View>
        );
    }
}

export default HomeScreen;