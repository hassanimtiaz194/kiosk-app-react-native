import { paymentType } from "../../../constants/commonTypes";
import {
    BOOK_APPOINTMENT,
    SELECTED_PAYMENT_TYPE,
    FETCH_ALL_PROVIDER_SERVICES_SUCCESSFUL,
    SELECTED_SERVICE,
    FETCH_ALL_STATE_INSURANCES_SUCCESSFUL,
    SELECTED_INSURANCE,
    NAVIGATION_DETAILS,
    SELECTED_INSURANCE_DETAILS,
    FETCH_MASTER_SCHEDULE_SUCCESSFUL,
    PROVIDERS,
    SELECTED_PROVIDER,
    SELECTED_TIMESLOT,
    SERVICES,
    MEMBER_DETAILS
} from "./actions";

export const DEFAULT = {
    isBookAppointment: false,
    paymentType: paymentType.insurance,
    navigation: {},
    appointmentDetails: {
        service: {},
        insurance: {},
        insuranceDetails: {},
        memberDetails: {},
        provider: {},
        timeSlot: {},
    },
    slotProviders: [],
    allProviderServices: [],
    allStateInsurances: [],
    allStateActiveInsurance: [],
    services: {},
    masterSchedule: [],
};

export default function appointmentReducer(state = DEFAULT, actions) {
    const { type, payload } = actions;
    switch (type) {
        case NAVIGATION_DETAILS:
            return {
                ...state,
                navigation: payload,
            };
        case BOOK_APPOINTMENT:
            return {
                ...state,
                isBookAppointment: payload,
            };
        case SELECTED_PAYMENT_TYPE:
            return {
                ...state,
                paymentType: payload,
            };
        case FETCH_ALL_PROVIDER_SERVICES_SUCCESSFUL:
            return {
                ...state,
                allProviderServices: payload.schedule,
            };
        case FETCH_ALL_STATE_INSURANCES_SUCCESSFUL:
            return {
                ...state,
                allStateInsurances: payload.insurances,
                allStateActiveInsurance: payload.activeInsurance,
            };
        case SELECTED_SERVICE:
            return {
                ...state,
                appointmentDetails: {
                    ...state.appointmentDetails,
                    service: payload,
                },
            };
        case SELECTED_INSURANCE:
            return {
                ...state,
                appointmentDetails: {
                    ...state.appointmentDetails,
                    insurance: payload,
                },
            };
        case SELECTED_INSURANCE_DETAILS:
            return {
                ...state,
                appointmentDetails: {
                    ...state.appointmentDetails,
                    insuranceDetails: payload,
                },
            };
        case FETCH_MASTER_SCHEDULE_SUCCESSFUL: {
            return {
                ...state,
                masterSchedule: payload?.data,
            };
        }
        case PROVIDERS: {
            return {
                ...state,
                slotProviders: payload,
            };
        }
        case SELECTED_PROVIDER: {
            return {
                ...state,
                appointmentDetails: {
                    ...state.appointmentDetails,
                    provider: payload,
                },
            };
        }
        case SELECTED_TIMESLOT: {
            return {
                ...state,
                appointmentDetails: {
                    ...state.appointmentDetails,
                    timeSlot: payload,
                },
            };
        }
        case SERVICES:
            return {
                ...state,
                services: payload,
            };
        case MEMBER_DETAILS:
            return {
                ...state,
                appointmentDetails: {
                    ...state.appointmentDetails,
                    memberDetails: payload,
                },
            };
        default:
            return state;
    }
}