import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		"Access-Control-Allow-Origin": "*",
  },
});

export default clientAxios;
