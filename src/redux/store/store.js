import { createStore, applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER
} from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";
import Config from "../../config";

const persistConfig = {
   key: 'kiosk',
   storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

if (__DEV__ && Config.environment === 'sit1') {
   middlewares = middlewares.concat(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         immutableCheck: { warnAfter: 128 },
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(middlewares),
});

sagaMiddleware.run(rootSaga, store);

export const persistor = persistStore(store);

export default store;