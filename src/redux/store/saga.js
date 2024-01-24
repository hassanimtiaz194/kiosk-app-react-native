import { all, fork } from "redux-saga/effects"
import appointmentSaga from "../modules/appointment/saga";
import settingsSaga from "../modules/settings/saga";

const rootSaga = function* (store) {
    yield all([
        fork(appointmentSaga),
        fork(settingsSaga),
    ])
}
export default rootSaga;
