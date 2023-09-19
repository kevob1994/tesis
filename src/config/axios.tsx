import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'https://backtesis-qzjx8.ondigitalocean.app/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': 'http://localhost:3000/'
  },
  withCredentials: true,
});

const headerAuthToken = () => {
  return {
    Authorization: 'Bearer ' + localStorage.token,
  };
};

const headerCsrf = () => {
  return {
    'X-CSRF-Token': localStorage.csrf,
  };
};

export { clientAxios, headerAuthToken, headerCsrf };
