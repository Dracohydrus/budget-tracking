import axios from "axios"

const isDevelopment = process.env.NODE_ENV === 'development';

export const axiosInstance = axios.create({
    baseURL: isDevelopment ? "/api" : "https://kris-banking-app.herokuapp.com/api"
})