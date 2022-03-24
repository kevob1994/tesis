import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'https://www.cjdonboscoboleita.com.ve/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default clientAxios;
