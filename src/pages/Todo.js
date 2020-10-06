import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import "./Todo.css";
import check from "./asset/checkk.png";
import firebase from 'firebase';

export default class Todolist extends Component {

  constructor(props){
    super(props);
    this.state={
        user: auth().currentUser,
        uid : auth().currentUser.uid,
        todo: [],
        activity:'',
    }
}

componentDidMount(){
db.collection(`${this.state.uid}`).orderBy('timestamp','desc').onSnapshot((snapshot)=>{
        let todoItem =[];
        snapshot.forEach((snap)=>{todoItem.push({id:snap.id, activity: snap.data()})});
        this.setState({todo:todoItem});
    })
}

handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    })
}

handleSubmit = async (event) => {
    event.preventDefault();
    await  db.collection(`${this.state.uid}`).add({
        activity: this.state.activity,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        completed: false,
    }).then(this.setState({activity:''}))
}

async completeItem(key){
    let dataRef =  db.collection(`${this.state.uid}`).doc(`${key}`);
    dataRef.get().then(function(doc){
        if (doc.data().completed==true){dataRef.update({completed:false})}
        else{dataRef.update({completed:true})}
    })
    
}

delItem(key){
    db.collection(`${this.state.uid}`).doc(`${key}`).delete();
}

  userVerification= async (event) => {
    var actionCodeSettings = {
      url: "https://to-do-list-with-react.web.app/todo",
      handleCodeInApp: false,
    };
    event.preventDefault();
    this.state.user
      .sendEmailVerification(actionCodeSettings)
      .then(function () {
        alert("Please check your mailbox for account confirmation link");
      })
      .catch(function (error) {
        alert(error.message)
      });
  }
  render() {
    return (
      <div className="home">
        <div className="jumbo">
          <Header />
          {!this.state.user.emailVerified ? (
            <div className="email-confirm">
              <h1>Please verify your email address</h1>
              <p>
                In order to use "To do list", you need to confirm your email
                address
              </p>
              <button
                className="verify-btn"
                type="button"
                onClick={this.userVerification}
              >
                Verify email address
              </button>
            </div>
          ) : (
            <>
             
              <div className="todo-container">
                <h1 className="title-todo">What would you do today?</h1>
                <form onSubmit={this.handleSubmit}>
                  <input
                    placeholder="Type activity"
                    className="inputAct"
                    name="activity"
                    onChange={this.handleChange}
                    value={this.state.activity}
                  ></input>

                  {this.state.error ? (
                    <p className="text-danger">{this.state.error}</p>
                  ) : null}
                  <button type="submit" className="btn-submit">
                    +
                  </button>

                  {/* loading indicator */}
                  {this.state.loading ? (
                    <div className="loading">
                      <span className="loading-title">Loading...</span>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
                <ul>
                  {this.state.todo.map((item) => {
                    if (item.activity.completed) {
                      return (
                        <li key={item.id} className="complete-item">
                          {item.activity.activity}

                          <button
                            className="del"
                            onClick={() => this.delItem(item.id)}
                          >
                            X
                          </button>
                          <img
                            src={check}
                            className="done"
                            alt="check"
                            onClick={() => this.completeItem(item.id)}
                          ></img>
                          <br />
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.id} className="item">
                          {item.activity.activity}

                          <button
                            className="del"
                            onClick={() => this.delItem(item.id)}
                          >
                            X
                          </button>
                          <img
                            src={check}
                            className="done"
                            alt="check"
                            onClick={() => this.completeItem(item.id)}
                          ></img>
                          <br />
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="userName">
                <p>
                  Login in as:{" "}
                  <strong className="text-info">{this.state.user.email}</strong>
                </p>
              </div>
            </>
          )}
          <div></div>
        </div>
      </div>
    );
  }
}
