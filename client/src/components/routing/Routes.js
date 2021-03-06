import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Requests from '../posts/requests';
import Request from '../post/request';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/request' component={Requests} />
        <PrivateRoute exact path='/request/:id' component={Request} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;