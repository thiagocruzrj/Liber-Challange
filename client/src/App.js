import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Cadastro from './components/auth/Cadastro';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Requests from './components/requests/Requests';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/cadastro' component={Cadastro} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/index'>
                <h1>Welcome cadastro.name</h1>
              </PrivateRoute>
              <PrivateRoute exact path='/request' component={Requests} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
