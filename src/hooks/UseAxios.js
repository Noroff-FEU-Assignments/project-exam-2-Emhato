import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../constants/Api";

const url = BASE_URL;

export default function useAxios() {
    const [auth] = useContext(AuthContext);
    const ApiClient = axios.create({
        baseURL: url,
    });

    ApiClient.interceptors.request.use(function (config) {
        const token = auth.jwt;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return ApiClient;
}
