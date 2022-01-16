import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://test-node-and-react.herokuapp.com/api"
})