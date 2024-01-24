import AsyncStorage from "@react-native-async-storage/async-storage";

export const setInitialSettings = () => {
    AsyncStorage.setItem('appSettings', JSON.stringify({
        state: "Connecticut",
        insurance: [],
        isMemberScreenSkipped: false
    }));
    console.log('running setting intial states');
};

export const getSettings = async () => {
    let appSettings = JSON.parse(await AsyncStorage.getItem('appSettings'));
    if (appSettings === null) {
        setInitialSettings();
        appSettings = JSON.parse(await AsyncStorage.getItem('appSettings'));
    }
    return appSettings;
};

export const updateSettings = (data) => {
    AsyncStorage.setItem('appSettings', JSON.stringify(data));
};

export const setInitialAccessCode = () => {
    AsyncStorage.setItem('accessCode', JSON.stringify({ accessCode: '0000' }));
    console.log('running access code intial states');
};

export const getAccessCode = async () => {
    let accessCode = JSON.parse(await AsyncStorage.getItem('accessCode'));
    if (accessCode === null) {
        setInitialAccessCode();
        accessCode = JSON.parse(await AsyncStorage.getItem('accessCode'));
    }
    return accessCode;
};

export const updateAccessCode = (value) => {
    AsyncStorage.setItem('accessCode', JSON.stringify({ accessCode: value }));
};