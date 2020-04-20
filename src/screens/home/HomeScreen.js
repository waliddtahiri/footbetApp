import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

 
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: this.props.player.bet
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

export default connect(mapStateToProps)(HomeScreen);