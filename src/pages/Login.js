import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";
import "./Login.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    if (this.state.email == "" || this.state.password == "") {
      this.setState({ error: "Please type required fields" });
    } else {
      try {
        await signin(this.state.email, this.state.password);
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }

  async googleSignIn(event) {
    event.preventDefault();
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="container2">
        <div></div>
        <form className="form" autoComplete="off" onSubmit={this.handleSubmit}>
          <h1>
            <p className="title-login">Login to</p>
            <Link className="title2" to="/">
              My to do list
            </Link>
          </h1>
          <p className="lead">
            Fill in the form below to login to your account.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="form-error">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
          </div>
          <div className="form-button">
            <button className="loginbtn" type="submit">
              Login
            </button>
            <div className="loginGg" type="button" onClick={this.googleSignIn}>
              <div>Log In With Google</div>
            </div>
          </div>
        </form>

        <div>
          <div className="already">
            Don't have an account?{" "}
            <Link className="other" to="/signup">
              Sign up
            </Link>
          </div>

          <div className="reset">
            Forget your password?
            <Link className="forgot" to="/resetPassword">
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
