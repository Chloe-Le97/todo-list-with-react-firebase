import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle } from "../helpers/auth";
import "./Signup.css";
import "./Login.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "Password does not match" });
    } else if (this.state.email == "" || this.state.password == "") {
      this.setState({ error: "Please type required fields" });
    } else {
      try {
        await signup(this.state.email, this.state.password);
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
        <form className="form" onSubmit={this.handleSubmit}>
          <h1>
            <p className="title-login">Sign Up to</p>
            <Link className="title2" to="/">
              My to do list
            </Link>
          </h1>
          <p>Fill in the form below to create an account</p>
          <div className="form-group">
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            ></input>
          </div>
          <div className="form-group">
            <input
              placeholder="Repeat Password"
              name="confirmPassword"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              type="password"
            ></input>
          </div>
          <div className="form-button">
            {this.state.error ? (
              <div className="form-error">{this.state.error}</div>
            ) : null}
            <button className="loginbtn" type="submit">
              Sign Up
            </button>
            <div className="loginGg" type="button" onClick={this.googleSignIn}>
              <div>Sign In With Google</div>
            </div>
          </div>
        </form>

        <div>
          <div className="already">
            Already have an account?{" "}
            <Link className="other" to="/login">
              Login
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

export default Signup;
