import { createAction } from '@reduxjs/toolkit';

export const NAVIGATION_DETAILS = 'appointment/NAVIGATION_DETAILS ';

export const BOOK_APPOINTMENT = 'appointment/BOOK_APPOINTMENT';

export const SELECTED_PAYMENT_TYPE = 'appointment/SELECTED_PAYMENT_TYPE';

export const FETCH_ALL_PROVIDER_SERVICES = 'appointment/FETCH_ALL_PROVIDER_SERVICES';
export const FETCH_ALL_PROVIDER_SERVICES_SUCCESSFUL = 'appointment/FETCH_ALL_PROVIDER_SERVICES_SUCCESSFUL';

export const FETCH_INSURANCE = 'appointment/FETCH_INSURANCE';
export const FETCH_ALL_STATE_INSURANCES_SUCCESSFUL = 'appointment/FETCH_ALL_STATE_INSURANCES_SUCCESSFUL';

export const FETCH_MASTER_SCHEDULE = 'appointments/fetchMasterSchedule';
export const FETCH_MASTER_SCHEDULE_SUCCESSFUL = 'appointments/fetchMasterScheduleSuccessful';

export const SELECTED_SERVICE = 'appointment/SELECTED_SERVICE';
export const SELECTED_INSURANCE = 'appointment/SELECTED_INSURANCE';
export const SELECTED_INSURANCE_DETAILS = 'appointment/SELECTED_INSURANCE_DETAILS';
export const SELECTED_PROVIDER = 'appointment/SELECTED_PROVIDER';
export const SELECTED_TIMESLOT = 'appointment/SELECTED_TIMESLOT'
export const MEMBER_DETAILS = 'appointment/MEMBER_DETAILS'

export const PROVIDERS = 'appointment/PROVIDERS';
export const SERVICES = 'appointment/SERVICES';

export const appointmentActions = {
    navigationDetails: createAction(NAVIGATION_DETAILS),
    isBookAppointment: createAction(BOOK_APPOINTMENT),
    selectedPaymentType: createAction(SELECTED_PAYMENT_TYPE),
    fetchAllProviderServices: createAction(FETCH_ALL_PROVIDER_SERVICES),
    fetchInsurance: createAction(FETCH_INSURANCE),
    services: createAction(SERVICES),
    selectedService: createAction(SELECTED_SERVICE),
    selectedInsurance: createAction(SELECTED_INSURANCE),
    selectedInsuranceDetails: createAction(SELECTED_INSURANCE_DETAILS),
    fetchMasterSchedule: createAction(FETCH_MASTER_SCHEDULE),
    providers: createAction(PROVIDERS),
    selectedProvider: createAction(SELECTED_PROVIDER),
    selectedTimeSlot: createAction(SELECTED_TIMESLOT),
    memberDetails: createAction(MEMBER_DETAILS),
};