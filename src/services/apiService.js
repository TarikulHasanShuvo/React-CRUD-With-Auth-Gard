import axios from 'axios';


const ApiService = {
    init() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
    },

    get(resource, params) {
        return axios.get(`${resource}`, params);
    },

    post(resource, params) {
        return axios.post(`${resource}`, params);
    },

    update(resource, params) {
        return axios.put(`${resource}`, params);
    },

    delete(resource, params) {
        return axios.delete(resource);
    },
}

export default ApiService;
