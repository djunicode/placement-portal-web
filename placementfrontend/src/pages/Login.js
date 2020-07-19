import React, { Component } from 'react'
import '../Login_Signup.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      message:"",
      email:"",
      password:""
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
    // console.log(this.state.email)
    // console.log(this.state.password)
  }

  handleSubmit = event => {
    event.preventDefault()
    const login_user ={
      password: this.state.password,
      email: this.state.email ,
    }
    axios
   .post(`http://kanishkshah.pythonanywhere.com/api/auth/token/login/`,login_user)
    .then(response => {
      // console.log(response)
      // console.log(response.data.auth_token)
      localStorage.setItem('token',response.data.auth_token)
      this.props.history.push('/StudentDashboardMain')
    })
    .catch(err => {
      this.setState({
        message:err.response.data.non_field_errors[0]
      })
      // console.log(this.state.message)
    })
  }

    render() {
        return (
            <div>
                <div className="nav1"></div>
                    <div className="head">
                        <div className="main-head">
                            
                            <div className="green1"></div>
                            <div className="grey1">
                                
                                <h1 className="title1">Welcome !</h1>
                                
                                <form onSubmit={this.handleSubmit} className="form1">

                                    <input className="input1" name="email" type='email' onChange={this.handleChange} required placeholder='email-id'></input><br></br>
                                    <input className="input1" name="password" type='password' onChange={this.handleChange} required placeholder='password'></input>
                                    <div>
                                      <div className="msg">{this.state.message}</div>

                                    {/* <Link to="/StudentDashboardMain" style={{ textDecoration: 'none' }} ><button className="button1" type="submit"  title='incorrect password!Try again' >Login</button></Link> */}
                                    <button className="button1" type="submit"  title='incorrect password!Try again' >Login</button>
                                        <p className="height register1" >
                                            not a registered user?
                                            <p>
                                                <Link to="/studentSignup" style={{ textDecoration: 'none' }} ><span className="reg1" > Signup as student </span></Link><br></br>
                                                <Link to="/staffSignup" style={{ textDecoration: 'none' }} ><span className="reg1"> Signup as staff </span></Link>                                    
                                            </p>
                                            
                                        </p>
                                        
                                    </div>
                                </form>
                                
                            </div>

                        </div>
                    </div>       
            </div>
                          
            
        )
    }
}


export default Login
