/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/store/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '@env';


const Application = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
                <App />
            </StripeProvider>
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Application);
