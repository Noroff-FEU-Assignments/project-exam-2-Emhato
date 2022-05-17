import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../constants/Api";

// check url
const url = BASE_URL;

export default function useAxios() {
    const [auth] = useContext(AuthContext);
    const ApiClient = axios.create({
        baseURL: url,
    });

    console.log(url)

    ApiClient.interceptors.request.use(function (config) {
        const token = auth.jwt;
        // console.log(token)
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        console.log(config)
        return config;
        // headers.Authorization = token ? `Bearer ${token}` : "";
        // // console.log(hea)
        // return headers;
    });

    return ApiClient;
}
