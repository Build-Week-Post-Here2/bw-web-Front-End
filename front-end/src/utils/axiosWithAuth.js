import axios from 'axios'

export const axiosWithAuth = () => {
    const token = JSON.parse(localstorage.getItem('token'));
    return axios.create({
        headers: {
            Authorization: `${token}`
        },
        baseURL: ''
    });
};

