import axios from 'axios';
export const axiosinstance = axios.create({
    headers : {
        authorization : `Bearer ${localStorage.getItem('token')}`
    }
})