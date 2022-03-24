import axios from 'axios';

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['token'] = token;
  } else {
    axios.defaults.headers.common['token'] = token;
  }
};

export default setAuthToken;
