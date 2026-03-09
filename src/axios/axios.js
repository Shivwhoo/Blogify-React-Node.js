import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1", // Ya jo bhi aapka base URL hai
    withCredentials: true, // YEH SABSE ZAROORI HAI
});

export default api;