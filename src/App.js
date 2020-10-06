import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Todolist from "./pages/Todo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import ResetPassword from "./pages/resetPassword";
import './App.css'

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/todo" />
        )
      }
    />
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return (
      <div className="body">
        {this.state.loading === true ? (
          <div className='jumbo'>
            <div></div>
            <div className="loading-caption">Loading...</div>
            <div></div>
          </div>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute
                path="/todo"
                authenticated={this.state.authenticated}
                component={Todolist}
              />
              <PublicRoute
                path="/signup"
                authenticated={this.state.authenticated}
                component={Signup}
              />
              <PublicRoute
                path="/login"
                authenticated={this.state.authenticated}
                component={Login}
              />
              <PublicRoute
                path="/resetPassword"
                authenticated={this.state.authenticated}
                component={ResetPassword}
              />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
