import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
		//'Content-Type': 'application/json;charset=UTF-8',
		//"Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

const clientAxios2 = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
		//'Content-Type': 'application/json;charset=UTF-8',
		//"Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export { clientAxios, clientAxios2};
