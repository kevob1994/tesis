import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesPath } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth/auth';
import 'antd/dist/antd.css';
import './styles/index.scss';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch<any>(loadUser());
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
