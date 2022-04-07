import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesPath } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import 'antd/dist/antd.css';
import './styles/index.scss';
import {clientAxios, clientAxios2} from './config/axios';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
    getUser(); //Y esto
  }, []);

  //agregue esto
  async function getUser(){
  const csrf = await clientAxios.get('/sanctum/csrf-cookie');
  console.log('csrf =', csrf);

  const login = await clientAxios2.post('/login', {
    email:'jimmy@gmail.com',
    password:'12345678',
  });

  console.log('login =', login);
  };

  //Hasta aca

  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesPath />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
