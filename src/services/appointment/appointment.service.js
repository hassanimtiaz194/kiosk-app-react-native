import { apiEndpoints } from "../apiEndpoints";
import { baseRequestHandler } from "../manager/ApiManager";

export const getAllProviderServices = (params) => {
    return baseRequestHandler({ endpoint: apiEndpoints.GET_ALL_PROVIDER_SERVICES, requestBody: null, queryParams: params, pathParams: null });
};

export const fetchInsurance = (state) => {
    return baseRequestHandler({ endpoint: apiEndpoints.FETCH_INSURANCE, requestBody: null, queryParams: null, pathParams: { state } });
};

export const getAvailableSlots = (bodyRequest) => {
    return baseRequestHandler({ endpoint: apiEndpoints.GET_AVAILABLE_SLOTS, requestBody: null, queryParams: bodyRequest, pathParams: null });
};

export const createInsuranceInfo = (bodyRequest) => {
    return baseRequestHandler({ endpoint: apiEndpoints.CREATE_INSURANCE_PROFILE, requestBody: bodyRequest, queryParams: null, pathParams: null });
};

export const verifyInsurance = (userAccountId) => {
    return baseRequestHandler({ endpoint: apiEndpoints.VERIFY_INSURANCE, requestBody: null, queryParams: null, pathParams: { userAccountId } });
};

export const checkEmailPhoneUniqueness = (payload) => {
    return baseRequestHandler({ endpoint: apiEndpoints.CHECK_EMAIL_PHONE_UNIQUENESS, requestBody: payload, queryParams: null, pathParams: null });
};

export const saveProvisionalInfo = (payload) => {
    return baseRequestHandler({ endpoint: apiEndpoints.SAVE_PROVISIONAL_USER, requestBody: payload, queryParams: null, pathParams: null });
};

export const publicBookAppointment = (payload) => {
    return baseRequestHandler({ endpoint: apiEndpoints.PUBLIC_BOOK_APPOINTMENT, requestBody: payload, queryParams: null, pathParams: null });
};