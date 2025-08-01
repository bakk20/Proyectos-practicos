import axios from "axios";

const API = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL: API,
    headers:{
        'Content-type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosInstance