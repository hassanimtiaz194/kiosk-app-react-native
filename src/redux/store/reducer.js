import { combineReducers } from "redux";
import appointmentReducer from "../modules/appointment/reducer";
import settingReducer from "../modules/settings/reducer";


const rootReducer = combineReducers({
    appointment: appointmentReducer,
    settings: settingReducer,
})
export default rootReducer;
