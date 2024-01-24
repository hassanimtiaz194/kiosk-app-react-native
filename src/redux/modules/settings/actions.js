import { createAction } from '@reduxjs/toolkit';

export const RESET_TIMER = 'setting/RESET_TIMER ';

export const SKIP_MEMBERID = 'setting/SKIP_MEMBERID';

export const FETCH_STATES = 'setting/FETCH_STATES';
export const FETCH_STATES_SUCCESSFUL = 'setting/FETCH_STATES_SUCCESSFUL';
export const FETCH_STATES_FAILED = 'setting/FETCH_STATES_SUCCESSFUL';

export const STORE_APPLICATION_SETTINGS = 'setting/FETCH_APPLICATION_SETTINGS';
export const STORE_ACCESS_CODE = 'setting/STORE_ACCESS_CODE';

export const settingsActions = {
    resetTimer: createAction(RESET_TIMER),
    skipMemberId: createAction(SKIP_MEMBERID),
    fetchStates: createAction(FETCH_STATES),
    storeApplicationSettings: createAction(STORE_APPLICATION_SETTINGS),
    storeAccessCode: createAction(STORE_ACCESS_CODE),
};