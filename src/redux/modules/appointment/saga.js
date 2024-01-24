import { call, put, takeLatest } from 'redux-saga/effects';
import * as appointmentService from './../../../services/appointment/appointment.service';

import {
    FETCH_ALL_PROVIDER_SERVICES,
    FETCH_ALL_PROVIDER_SERVICES_SUCCESSFUL,
    FETCH_ALL_STATE_INSURANCES_SUCCESSFUL,
    FETCH_INSURANCE,
    FETCH_MASTER_SCHEDULE,
    FETCH_MASTER_SCHEDULE_SUCCESSFUL
} from './actions';

function* fetchAllProviderServices(action) {
    try {
        const { initial, state } = action.payload;
        const params = {
            initial: !!initial,
            state
        };
        const { data } = yield call(appointmentService.getAllProviderServices, params);
        yield put({
            type: FETCH_ALL_PROVIDER_SERVICES_SUCCESSFUL,
            payload: {
                schedule: data,
            },
        });
    } catch (e) {
        const message = e.data.errors?.[0]?.endUserMessage || 'Something went wrong';
        console.warn(message);
    }
}

function* fetchInsurance(action) {
    try {
        const { stateName } = action.payload;
        const { data } = yield call(appointmentService.fetchInsurance, stateName);
        const activeInsurance = data.data.filter(item => item.isActive);
        console.log(activeInsurance);
        yield put({
            type: FETCH_ALL_STATE_INSURANCES_SUCCESSFUL,
            payload: {
                insurances: data.data,
                activeInsurance,
            },
        });
    } catch (e) {
        const message = e.data.errors?.[0]?.endUserMessage || 'Something went wrong';
        console.log(message);
    }
}

function* fetchMasterSchedule(action) {
    try {
        const { data } = yield call(appointmentService.getAvailableSlots, action?.payload);
        yield put({
            type: FETCH_MASTER_SCHEDULE_SUCCESSFUL,
            payload: {
                data: data?.results,
            },
        });
    } catch (e) {
        const message = err.data.errors?.[0]?.endUserMessage || 'Something went wrong';
        console.warn(message);
    }
}

export default function* appointmentSaga() {
    yield takeLatest(FETCH_ALL_PROVIDER_SERVICES, fetchAllProviderServices);
    yield takeLatest(FETCH_INSURANCE, fetchInsurance);
    yield takeLatest(FETCH_MASTER_SCHEDULE, fetchMasterSchedule);
}