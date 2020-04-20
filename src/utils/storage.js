import {AsyncStorage} from 'react-native';

export async function getFromStorage(key) {
    if (!key) {
        return null;
    }

    try {
        const valueStr = AsyncStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (err) {
        return null;
    }
}

export async function setInStorage(key, obj) {
    if(!key) {
        console.error('Error: Key is missing');
    }

    try {
        AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}

export async function removeFromStorage(key) {
    if(!key) {
        console.error('Error: Key is missing');
    }
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(err) {
        console.error(err);
        return false;
    }
}