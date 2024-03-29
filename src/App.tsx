import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesPath } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import 'antd/dist/antd.css';
import './styles/index.scss';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesPath />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
