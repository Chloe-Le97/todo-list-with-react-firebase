import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import "./Home.css";

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <section>
          <div className="jumbo">
            <Header></Header>
            <div className="container">
              <h1 className="title">FINISH ME!</h1>
              <p className="intro">What would you do today?</p>
              {auth().currentUser ? (
                <div className="navbar-nav">
                  <Link className="my-activities" to="/todo">
                    My activities
                  </Link>
                </div>
              ) : (
                <div className="account">
                  <Link className="btn" to="/signup">
                    Create New Account
                  </Link>
                  <Link className="btn" to="/login">
                    Login to Your Account
                  </Link>
                </div>
              )}
            </div>
            <Footer></Footer>
          </div>
        </section>
      </div>
    );
  }
}
