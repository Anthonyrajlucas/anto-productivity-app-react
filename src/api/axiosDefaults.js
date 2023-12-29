import axios from "axios";

axios.defaults.baseURL = "https://anto-productivity-app-backend-6c122e357cb1.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();