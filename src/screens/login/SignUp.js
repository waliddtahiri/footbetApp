import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import AlertPro from "react-native-alert-pro";

import {
    getFromStorage,
    setInStorage,
} from '../../utils/storage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class SignUp extends Component {

    state = {
        username: '',
        password: '',
        token: '',
        signUpError: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            axios.get('http://192.168.0.239:5000/SignUp/verify?token=' + token)
                .then(res => {
                    if (res.data.success) {
                        this.setState({
                            token,
                        });
                    }
                });
        }
    }

    goBack = () => {
        this.props.navigation.navigate('Login');
    }

    signUp = () => {

        const username = this.state.username.toLowerCase();
        const password = this.state.password;

        // create user object
        const newUser = {
            username,
            password
        };

        // attempt to register
        this.props.register(newUser);
    }


    render() {
        return (
            <ImageBackground source={{ uri: 'https://free-hd-wallpapers.info/wp-content/uploads/2018/03/football-pitch-wallpaper-football-field-wallpaper-walls-15-with-football-field-wallpaper-walls.jpg' }}
                style={styles.backgroundImage}>
                <View style={styles.content}>
                    <Text style={styles.logo}> FootBet </Text>
                    <View style={styles.inputContainer}>
                        <TextInput underlineColorAndroid='transparent' style={styles.input}
                            onChangeText={(username) => this.setState({ username })} value={this.state.username}
                            placeholder='username' />
                        <TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
                            onChangeText={(password) => this.setState({ password })} value={this.state.password}
                            placeholder='password' />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={this.goBack} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>GO BACK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.signUp} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.msg ? (
                        <View style={styles.errorsContainer}>
                            <Text style={styles.buttonText}>{this.state.msg}</Text>
                        </View>
                    ) : null}
                </View>
            </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        color: 'white',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textShadowColor: '#252525',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 15,
        marginBottom: 20
    },
    inputContainer: {
        margin: 20,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    errorsContainer: {
        margin: 20,
        padding: 20,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,0,0,0.2)',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 10,
        padding: 10,
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(SignUp);