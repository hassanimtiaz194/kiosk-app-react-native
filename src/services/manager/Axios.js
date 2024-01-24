import axios from 'axios';
import Config from '../../config/index';
import store from '../../redux/store/store';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: Config.baseUrl,
  timeout: 60000, // 60 seconds
});

/* // Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => { // Specify return type
    try {

      const { userInfo } = store.getState().auth;
      const authToken = userInfo?.accessToken ? userInfo?.accessToken : null
      if (authToken) {
        (config.headers)['Authorization'] = `Bearer ${authToken}`;
      }
    } catch (error) {
      console.error("[axios].request.catch.error", error);
    } finally {
      return config;
    }
  },
  (error) => {
    console.error("[Axios.Request.Error]", error);
    return Promise.reject(error.response ? error.request : error);
  }
); */



axiosInstance.interceptors.response.use(
  async (response) => {
    // console.log("[axios].response", response)
    try {

    }
    catch (error) {
      console.log("[axios].response.catch.error", error)
    }
    finally {
      return response
    }
  },
  async (error) => {
    try {
      console.log("Error axios ", error);
    } catch (error) {
      console.log("[axios].response.error.catch.error", error)

    } finally {
      return Promise.reject(error.response ? error.response : error);
    }
  });

export default axiosInstance;
