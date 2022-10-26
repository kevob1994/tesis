import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesPath } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import 'antd/dist/antd.css';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch<any>(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer theme='colored' />
        <RoutesPath />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
