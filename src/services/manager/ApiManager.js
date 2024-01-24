import axiosInstance from "./Axios";
import { AxiosRequestConfig, AxiosError, isAxiosError, AxiosResponse } from 'axios'
import { ParamsType } from "./types";
import ENUMS from "../../utils/ENUMS";
import { err } from "react-native-svg/lib/typescript/xml";
const { STATUS_CODES } = ENUMS

function generateQueryParams(queryParams) {
    const esc = encodeURIComponent;
    return `?${String(
        Object.keys(queryParams)
            .map(k => `${esc(k)}=${esc(queryParams[k])}`)
            .join('&'),
    )}`;
}
function formatEndpoint(
    endpoint = '',
    queryParams = {},
    pathParams = {},
) {
    // generating fully qualified path for request
    let formattedEndpoint = endpoint;
    if (pathParams) {
        // Replacing url path params with actual provided values.
        Object.keys(pathParams).forEach(key => {
            formattedEndpoint = formattedEndpoint.replace(`{${String(key)}}`, pathParams[key]);
        });
    }


    if (queryParams) {
        // Appending Query params with url path
        formattedEndpoint += generateQueryParams(queryParams);
    }

    return formattedEndpoint;
}


const methodType = (method) => {
    switch (method.toLowerCase()) {
        case 'get':
            return 'GET';
        case 'delete':
            return 'DELETE';
        case 'head':
            return 'HEAD';
        case 'options':
            return 'OPTIONS';
        case 'post':
            return 'POST';
        case 'put':
            return 'PUT';
        case 'patch':
            return 'PATCH';
        case 'purge':
            return 'PURGE';
        case 'link':
            return 'LINK';
        case 'unlink':
            return 'UNLINK';
        default:
            console.log('Invalid Type returning get');
            return 'GET';
    }
}
export const baseRequestHandler = async ({
    endpoint,
    requestBody = null,
    queryParams,
    pathParams,
    headers = {},
    formDataKey = '',
    isMultipart = false,
    isBlob = false,

}) => {
    try {
        const endpointPath = formatEndpoint(endpoint?.path, queryParams, pathParams);
        if (isMultipart) {
            let formData = new FormData();
            formData.append(formDataKey, JSON.stringify(requestBody[formDataKey]));
            if (requestBody.file) {
                formData.append('file', requestBody.file);
            }
            requestBody = formData;
            headers = { 'Content-Type': 'multipart/form-data', ...headers }
        }
   
        const config = isBlob
            ? {
                method: methodType(endpoint.method),
                baseURL: isBase ? getConfig.api.baseUrl : elkBaseUrl,
                headers,
                responseType: 'blob',
                url: `${elkPrefix}${endpointPath}`,
                data: isBase ? requestBody : elkBody,
            }
            : {
                method: methodType(endpoint.method),
                headers,
                url: `${endpointPath}`,
                data: requestBody,
            };
        // console.log("baseRequestHandler  config", config);
        return axiosInstance.request(config);
    } catch (error) {
        console.log("Error", error);
    }
};

