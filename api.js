import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: "https://alexa-server-0r8p.onrender.com/",
=======
    baseURL: "http://127.0.0.1:8000/",
>>>>>>> 770b76f8e8da75ba725b5a9bcd2476b5007be279
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;