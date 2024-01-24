import {
    FETCH_STATES_FAILED,
    FETCH_STATES_SUCCESSFUL,
    RESET_TIMER,
    STORE_ACCESS_CODE,
    STORE_APPLICATION_SETTINGS,
} from "./actions";

export const DEFAULT = {
    accessCode: '0000',
    appSettings: {},
    isResetTimer: false,
    states: [],
};

export default function settingReducer(state = DEFAULT, actions) {
    const { type, payload } = actions;
    switch (type) {
        case RESET_TIMER:
            return {
                ...state,
                isResetTimer: payload,
            };
        case FETCH_STATES_SUCCESSFUL: {
            return {
                ...state,
                states: payload,
            };
        }
        case FETCH_STATES_FAILED: {
            return {
                ...state,
                states: [],
            };
        }
        case STORE_APPLICATION_SETTINGS: {
            return {
                ...state,
                appSettings: payload,
            };
        }
        case STORE_ACCESS_CODE: {
            return {
                ...state,
                accessCode: payload,
            };
        }
        default:
            return state;
    }
}