import { call, put, takeLatest } from 'redux-saga/effects';
import * as settingsService from './../../../services/settings/settings.service';
import { FETCH_STATES, FETCH_STATES_FAILED, FETCH_STATES_SUCCESSFUL, FETCH_APPLICATION_SETTINGS, UPDATE_APPLICATION_SETTINGS } from './actions';


function* fetchStates() {
    try {
        const response = yield call(settingsService.getStates);
        yield put({
            type: FETCH_STATES_SUCCESSFUL,
            payload: response.data.data,
        });
    } catch (e) {
        const message = e?.errors?.[0]?.endUserMessage || 'Something went wrong';
        console.warn(message);
        yield put({
            type: FETCH_STATES_FAILED,
            payload: { message },
        });
    }
}


export default function* settingsSaga() {
    yield takeLatest(FETCH_STATES, fetchStates);
}