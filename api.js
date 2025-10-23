import axios from 'axios';

const api = axios.create({
    baseURL: "https://alexa-server-0r8p.onrender.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;