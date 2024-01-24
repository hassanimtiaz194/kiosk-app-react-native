import { apiEndpoints } from "../apiEndpoints";
import { baseRequestHandler } from "../manager/ApiManager";

export const getStates = (params) => {
    return baseRequestHandler({ endpoint: apiEndpoints.GET_STATES_SIMPLE, requestBody: null, queryParams: null, pathParams: null });
};

export const getPayers = (stateId) => {
    return baseRequestHandler({ endpoint: apiEndpoints.GET_PAYERS, requestBody: null, queryParams: null, pathParams: { stateId } });
};
