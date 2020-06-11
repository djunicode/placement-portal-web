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
    console.log(this.state.email)
    console.log(this.state.password)
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
      console.log(response)
      console.log(response.data.auth_token)
      localStorage.setItem('token',response.data.auth_token)
      this.props.history.push('/StudentDashboardMain')
    })
    .catch(err => {
      this.setState({
        message:err.response.data.non_field_errors[0]
      })
      console.log(this.state.message)
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


const Styles = {

    form1:{
        zIndex:'5',
        position: 'fixed',
        top:'30%',
        left:'15%',
        width:'calc((68%))'
      },
      
      nav1:{
        position: 'absolute' ,
        left: '0' ,
        top: '0' ,
        margin: '0' ,
        padding: '0' ,
        background: 'rgba(147,213,201)' ,
        width: '100%' ,
        height: '7%' 
      },
      green1:{
        background:  'rgba(147,213,201)' ,
        width: '550px' ,
        height: '500px' ,
        position: 'absolute' ,
        left: '50%' ,
        top: '57%' ,
        transform: 'translate(-50%,-50%)' ,
        zIndex: '1' ,
        borderRadius: '20px' 
      },
      grey1:{
        background:  'rgba(153,153,153,0.8)' ,
        width: '550px' ,
        height: '500px',
        position: 'absolute' ,
        left: '54%' ,
        top: '50%' ,
        transform: 'translate(-50%,-50%)' ,
        zIndex: '2' ,
        borderRadius: '20px' 
      },
      title1:{
        textAlign: 'center' ,
        color: 'white' ,
        textTransform: 'uppercase' ,
        fontSize: '2em' ,
        marginTop: '68px' ,
        fontWeight: '200' 
      },
      input1:{
        height: '45px' ,
        borderRadius: '20px' ,
        border: 'none' ,
        marginTop: '20px' ,
        fontSize: '1em' ,
        padding: '0px 10px' ,
        width: '100%' 
      },
      button1:{
        textAlign: 'center' ,
        color: 'white' ,
        fontWeight: 'bold' ,
        width:'calc((105%))' ,
        zIndex: '5' ,
        background:  'rgba(147,213,201)' ,
        height: '55px' ,
        borderRadius: '20px' ,
        border: 'none' ,
        fontSize: '1.5em' ,
        textTransform: 'uppercase' ,
        marginTop: '55px' 
      },
      register1:{
        textAlign: 'center' ,
        fontSize: '1em' ,
        marginTop: '15px' ,
        color: 'white' ,
        height: '10%' 
      },
      reg1:{
        cursor: 'pointer' ,
        fontWeight: 'bold' ,
        textAlign: 'center' ,
        color: 'white' ,
        textDecoration: 'none' ,
        paddingTop: '5px' 
      }
      
     
}


export default Login
