import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../constants/Api";

// check url
const url = BASE_URL;

export default function UseAxios() {
    const [auth] = useContext(AuthContext);
    const ApiClient = axios.create({
        baseURL: url,
    });

    console.log(url)

    ApiClient.interceptors.request.use(function (config) {
        const token = auth.token;
        console.log(token)
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        console.log(config)
        return config;
    });

    return ApiClient;
}
