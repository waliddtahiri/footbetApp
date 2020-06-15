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
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import {
    getFromStorage,
    setInStorage,
} from '../../utils/storage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import footBetLogo from '../../../footbetApp.jpg';


class Login extends Component {

    state = {
        username: '',
        password: '',
        token: '',
        signUpError: '',
        signInError: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            axios.get('http://192.168.0.239:5000/signin/verify?token=' + token)
                .then(res => {
                    if (res.data.success) {
                        this.setState({
                            token,
                        });
                    }
                });
        }
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    login = () => {

        const username = this.state.username.toLowerCase();
        const password = this.state.password;

        // create user object
        const user = {
            username,
            password
        };

        // attempt to login
        this.props.login(user);
    }

    register = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={footBetLogo}
                    style={styles.backgroundImage}>
                    <View style={styles.content}>
                        <Text style={styles.logo}> FootBet </Text>
                        <View style={styles.inputContainer}>
                            <TextInput underlineColorAndroid='transparent' style={styles.input}
                                onChangeText={(username) => this.setState({ username, msg: null })} value={this.state.username}
                                placeholder='username' />
                            <TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
                                onChangeText={(password) => this.setState({ password, msg: null })} value={this.state.password}
                                placeholder='password' />
                            <View>
                                <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.register} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.msg ? (
                        <View style={styles.errorsContainer}>
                            <Text style={styles.buttonText}>{this.state.msg}</Text>
                        </View>
                    ) : null}
                </ImageBackground>
            </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
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
        marginBottom: 20,
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
        padding: 20,
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

export default connect(mapStateToProps, { login })(Login);

