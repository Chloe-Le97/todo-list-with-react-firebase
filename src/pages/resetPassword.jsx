import React from "react";
import { resetPassword } from "../helpers/auth";
import Header from "../components/Header";
import "./resetPassword.css";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async resetPassword(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await resetPassword(this.state.email)
        .then(function () {
          alert("Please check your email");
        })
        .then(this.setState({ email: "" }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="container2">
        <Header />
        <form className="reset-form" onSubmit={this.resetPassword}>
          <div className="forget">
            Please type your email below for information about password reset
          </div>
          <input
            placeholder="Type your email"
            name="email"
            value={this.state.email}
            className="reset-input"
            onChange={this.handleChange}
          ></input>
          <div>
            <button className="reset-btn" type="submit">
              Reset Password
            </button>
          </div>
          <div className="form-error">{this.state.error}</div>
        </form>
        <div></div>
      </div>
    );
  }
}

export default ResetPassword;
