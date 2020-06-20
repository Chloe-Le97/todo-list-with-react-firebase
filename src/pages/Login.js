import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle} from "../helpers/auth";
import './Login.css';


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }


  render() {
    return (
      <div className="container2">
        <form
          className="form"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            <p className='title-login'>Login to</p>
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
            <div className='form-error'>         
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            </div>
            <div className="form-button">
            <button className="loginbtn" type="submit">Login</button>
            <button className="loginbtn" type="button" onClick={this.googleSignIn}>
            Sign in with Google
             </button>
           </div>   
          
          <p className="already">
            <hr />
            Don't have an account? <Link className="other" to="/signup">Sign up</Link>
          </p>
        </form>

      </div>
    );
  }
}