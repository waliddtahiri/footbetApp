import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

class Test extends Component {
    render() {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

const mapStateToProps = state => ({
    player: state.auth.player,
});

export default Test;