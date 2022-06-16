import axios from "axios";

export const axiosAuth = axios.create()

//we intercept every requests 
axiosAuth.interceptors.request.use(async function(config){
    config['headers']['Authorization'] ='Bearer ' +  localStorage.getItem("authToken");
    return config;
}, error => {
    return Promise.reject(error)
})
axiosAuth.interceptors.request.use(async function(config){
    return config;
}, error => {
    return Promise.reject(error)
})