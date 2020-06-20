import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../helpers/auth';
import './Signup.css';
import './Login.css';

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: '',
          email: '',
          password: '',
          confirmPassword:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event){
          this.setState({
              [event.target.name]:event.target.value
          })
      }

      async handleSubmit(event){
          event.preventDefault();
          if(this.state.password!==this.state.confirmPassword){
              this.setState({error:'Password does not match'})
          }
          else{
          try{
              await signup(this.state.email,this.state.password);
          }
          catch(error){
              this.setState({error:error.message})
          }
        }
      }



    render(){
        return(
            <div className='container2'>
                <form className='form' onSubmit={this.handleSubmit}>
                    <h1>
                        <p className='title-login'>Sign Up to</p>
                        <Link className='title2' to = '/'>My to do list</Link>
                    </h1>
                    <p>Fill in the form below to create an account</p>
                    <div className='form-group'>
                        <input 
                    placeholder="Email" 
                    name="email" 
                    type="email" 
                    onChange={this.handleChange} 
                    value={this.state.email}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <input 
                    placeholder="Password" 
                    name="password" 
                    onChange={this.handleChange} 
                    value={this.state.password} 
                    type="password">
                        </input>
                    </div>
                    <div className='form-group'>
                        <input 
                    placeholder="Repeat Password" 
                    name="confirmPassword" 
                    onChange={this.handleChange} 
                    value={this.state.confirmPassword} 
                    type="password">
                        </input>
                    </div>
                    <div>
                        {this.state.error? <div className='form-error'>{this.state.error}</div>:null}
                        <button className='signUpBtn' type='submit'>Sign Up</button>
                    </div>
                  
                    <p className="already">
                        <hr />
                        Already have an account? <Link className="other" to='/login'>Login</Link></p>
                </form>
            </div>
        )
    }
}

export default Signup;