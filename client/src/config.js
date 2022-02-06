import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://kris-banking-app.herokuapp.com/api"
    // baseURL: "/api"
})