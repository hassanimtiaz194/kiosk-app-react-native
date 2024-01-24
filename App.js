
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationRoot } from './src/navigations/NavigationContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { _NavgationRef } from './src/navigations/NavigationService';
import { useEffect } from 'react';
import Instabug, { InvocationEvent } from 'instabug-reactnative';
import Toast from 'react-native-toast-message';
import {
    INSTABUG_TOKEN,
} from '@env';
import config from './src/config';


// #region :: VECTOR ICON LOAD START's FROM HERE
void AntDesign.loadFont();
void Entypo.loadFont();
void Feather.loadFont();
void EvilIcons.loadFont();
void FontAwesome.loadFont();
void MaterialIcons.loadFont();
void MaterialCommunityIcons.loadFont()
void Ionicons.loadFont();
void Foundation.loadFont();
// #endregion :: VECTOR ICON LOAD END's FROM HERE


const App = () => {
    useEffect(() => {
        Instabug.init({
            token: INSTABUG_TOKEN,
            invocationEvents: [InvocationEvent.shake],
        });
        Instabug.setUserAttribute("Type", 'Kiosk App');
        Instabug.setUserAttribute("Environment", config.environment);
    }, []);

    return (
        <SafeAreaProvider >
            <NavigationContainer ref={_NavgationRef} onStateChange={(state) => Instabug.onStateChange(state)}>
                <NavigationRoot />
            </NavigationContainer>
            <Toast />
        </SafeAreaProvider>
    );
}
export default App;
