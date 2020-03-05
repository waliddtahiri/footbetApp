import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const LoadingScreen = () => {
    <View style={styles.container}>
        <ActivityIndicator 
            size="large"
        />
    </View>
};

export default LoadingScreen;