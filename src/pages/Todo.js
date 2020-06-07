import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import './Todo.css';

export default class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      todo: [],
      currentItem:{
        content: '',
        placeId: ''},
      readError: null,
      writeError: null,
      loading: false,
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delItem = this.delItem.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    var uid=this.state.user.uid;  
    this.setState({ readError: null, loading: true });
    /*update the database on every change of child of uid*/
    try {
      db.ref("todo").child(uid).on("value", snapshot => {
        let todo = [];
        snapshot.forEach((snap) => {
          todo.push(snap.val());
        }); 
        this.setState({ todo });
        this.setState({ loading: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loading: false });
    }
  }

  handleChange(event) {
    this.setState({
      currentItem:{content: event.target.value}
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    var uid=this.state.user.uid;
    var ref2=db.ref("todo");
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    /*push the content and update key to the database of the specific user*/
    ref2.child(uid).push({
        content: this.state.currentItem.content,
      }).then((snapshot) => {
            ref2.child(uid).child(snapshot.key).update({"key": snapshot.key})
        .then(
          this.setState({currentItem:{placeId:snapshot.key}}))
        .then(
          this.setState({currentItem:{content:''}}))
      });
     
  }

  delItem(key){
    var uid=this.state.user.uid;
    var ref2=db.ref("todo"); 
    db.ref(`todo/${this.state.user.uid}/${key}`).remove();
}

  render() {
    return (
      <div className='home'>
        

        <div className="jumbo" ref={this.myRef}>
          <Header />
         
          {/* todo area */}
          <h1 className="title">What would you do today?</h1>
          <form onSubmit={this.handleSubmit} className="mx-3">

            <input 

              placeholder='Type activity' 
              className="inputAct" 
              name="content" 
              onChange={this.handleChange} 
              value={this.state.currentItem.content}>

            </input>

          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <button type="submit" className="btn-submit">Send</button>

           {/* loading indicator */}
           {this.state.loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}

          </form>
          <ul>
          {this.state.todo.map(item => {
            return <li key={item.key} className='item'>
              {item.content}
              <button className='del' onClick={()=>this.delItem(item.key)}>X</button>
              <br />
           
            </li>
          })}
          </ul>
        
       
        <div className="userName">
         <p>Login in as: <strong className="text-info">{this.state.user.email}</strong></p>
         <p><button className="signOutBtn" onClick={() => auth().signOut()}>Logout</button></p>
        </div>
        </div>
      </div>
    );
  }
}