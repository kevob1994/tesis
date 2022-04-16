import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

const headerAuthToken = () => {
  return {
		Authorization: 'Bearer ' + localStorage.token
	}
};

export { clientAxios, headerAuthToken };
