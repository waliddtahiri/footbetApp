import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NestedListView, { NestedRow } from 'react-native-nested-listview'
import { CompetitionService } from '../../services/competition.service';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384259',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    row: {
        marginTop: 1,
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

const competitionService = new CompetitionService();

class MatchesScreen extends Component {
    static defaultProps = {
        competitionService
    }

    static propTypes = {
        player: PropTypes.object.isRequired
    }

    state = {
        loading: false,
        matchsSA: [],
        matchsLiga: [],
        matchsPL: [],
        matchsBL: []
    }

    async componentDidMount() {

        const postsSA = await this.props.competitionService.fetchCompetitionMatchesSA();
        const postsLiga = await this.props.competitionService.fetchCompetitionMatchesLiga();
        const postsPL = await this.props.competitionService.fetchCompetitionMatchesPL();
        const postsBL = await this.props.competitionService.fetchCompetitionMatchesBL();

        this.setState({ matchsSA: postsSA, matchsLiga: postsLiga, matchsPL: postsPL, matchsBL: postsBL });

    }


    render() {
        const player = this.props.player;

        const postsSA = [];
        const postsLiga = [];
        const postsPL = [];
        const postsBL = [];
        let matchday = 0;

        this.state.matchsSA.forEach(match => {
            if (match.matchday > matchday) {
                matchday = match.matchday;
            }
        });

        this.state.matchsSA.forEach(match => {
            if (match.matchday == matchday) {
                postsSA.push({
                    title: `${match.homeTeam} VS ${match.awayTeam}`,
                    info: match, homeTeam: match.homeTeam, awayTeam: match.awayTeam
                })
            }
        });

        this.state.matchsLiga.forEach(match => {
            if (match.matchday == matchday) {
                postsLiga.push({
                    title: `${match.homeTeam} VS ${match.awayTeam}`,
                    info: match, homeTeam: match.homeTeam, awayTeam: match.awayTeam
                })
            }
        });

        this.state.matchsPL.forEach(match => {
            if (match.matchday == matchday) {
                postsPL.push({
                    title: `${match.homeTeam} VS ${match.awayTeam}`,
                    info: match, homeTeam: match.homeTeam, awayTeam: match.awayTeam
                })
            }
        });

        this.state.matchsBL.forEach(match => {
            if (match.matchday == matchday) {
                postsBL.push({
                    title: `${match.homeTeam} VS ${match.awayTeam}`,
                    info: match, homeTeam: match.homeTeam, awayTeam: match.awayTeam
                })
            }
        });

        const data = [{ title: 'Serie A', matchs: postsSA, logo: require('../../../logoSA.png') },
        { title: 'Liga', matchs: postsLiga, logo: require('../../../logoLiga.jpg') },
        { title: 'Premier League', matchs: postsPL, logo: require('../../../logoPL.png') },
        { title: 'BundesLiga', matchs: postsBL, logo: require('../../../logoBL.png') }];

        return (
            <View style={styles.container}>
                <NestedListView
                    data={data}
                    getChildrenName={(node) => 'matchs'}
                    onNodePressed={(node) => {
                        if (node.title !== 'Serie A' && node.title !== 'Liga' && node.title !== 'Premier League' && node.title !== 'BundesLiga') {
                            this.props.navigation.navigate('Jouer', { match: node, player: player })
                        }
                    }
                    }
                    renderNode={(node, level) => (
                        <NestedRow level={level} style={styles.row}>
                            <Image source={node.logo} style={{ width: 50, height: 60 }} />
                            <Text style={styles.text}>{node.title}</Text>
                        </NestedRow>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    player: state.auth.player,
});

export default connect(mapStateToProps)(MatchesScreen);