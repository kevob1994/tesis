import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default clientAxios;
