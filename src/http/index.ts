import axios from "axios";
import routes from "@/routes";
import { localStorageManager } from "@/services";

const authAPI = axios.create({
    withCredentials: true,
    baseURL: routes.baseURL
})

authAPI.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorageManager.getItem("access")}`
    return config
})

authAPI.interceptors.response.use((config) => {
    return config
}, (async (error) => {
    const origialRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        origialRequest._isRetry = true
        try {
            const response= await axios.get(`${routes.baseURL}${routes.tokenRefresh}`, {withCredentials: true})
            console.log(response.data)
            localStorageManager.setItem("access", response.data.tokens.access)
            return authAPI.request(origialRequest)
        } catch (e) {
            console.log(e, "error")
        }
    }
    throw error
}))

export default authAPI