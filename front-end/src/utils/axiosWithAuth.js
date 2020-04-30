import axios from 'axios'

export const axiosWithAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return axios.create({
        headers: {
            // Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6IkxUaW1zMiIsImlhdCI6MTU4ODE4MzA0MCwiZXhwIjoxNTg4MjY5NDQwfQ.By05pBDOHdVrVRBfKrw1E6KZYeZBqpH137bdZAFkZyQ"
            Authorization: `${token}`
        },
        baseURL: 'https://post-here-2.herokuapp.com'
    });
};

export default axiosWithAuth
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJ1c2VybmFtZSI6IkxUaW1zIiwiaWF0IjoxNTg4MTMzNTkxLCJleHAiOjE1ODgyMTk5OTF9.hkU7pFZRiJ73puI7weT-gf7H1XSJNuYaOS9A-5vUmaw"

// https://post-here-subreddit.herokuapp.com/api/users/15/posts