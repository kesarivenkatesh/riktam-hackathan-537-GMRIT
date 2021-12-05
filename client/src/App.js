import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './config/setAuthToken';
import { setCurrentUser } from './actions/authActions';

// Config
import store from './config/store';


// Components
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Offer from './components/Offer';
import Request from './components/Request';


// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/offers">
              <Offer />
            </Route>
            <Route exact path="/requests">
              <Request />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
