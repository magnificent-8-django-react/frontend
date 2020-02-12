import React, { Component } from "react";

import SideBar from './components/sidebar/sidebar';
import './App.css';

import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Header from "./components/layout/Header";
import Home from "./components/Home";

// import PrivateRoute from "./components/common/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import store from "./store";
import { loadUser } from './actions/auth';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div id="App">
      <Provider store={store}>
          <Router>
            <Header/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
            </Switch>
          </Router>
      </Provider>
      
        <SideBar />
        <div id="page-wrap"></div>
      </div>
    );
  }
}

export default App;