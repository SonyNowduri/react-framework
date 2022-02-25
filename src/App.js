import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import store from './redux/store'
import { Provider } from 'react-redux'
import Dashboard from './components/Dashboard/dashboard';
import Home from './components/Home/home';
import SignIn from './components/SignIn/SignIn'
import Registration from './components/Registration/registration'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={SignIn} path="/signin" exact />
          <PublicRoute restricted={false} component={Registration} path="/register" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
        </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
