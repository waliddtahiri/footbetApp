import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    login = () => {
        fetch('http://192.168.0.239', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })

            .then((response) => response.json())
            .then((res) => {
                if (res.success === true) {
                    //var username = res.message;

                    //AsyncStorage.setItem('username', username);

                    this.props.navigation.navigate('Home');

                } else {
                    alert(res.message);
                }
            }).done();
    }


    render() {
        return (
            <View style={styles.container}>
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
                            <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

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
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 20,
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

export default Login;