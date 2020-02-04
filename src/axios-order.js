import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pushnotification-927ca.firebaseio.com/'
});

export default instance;