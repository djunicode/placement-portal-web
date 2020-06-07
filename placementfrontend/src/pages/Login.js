import React, { Component } from 'react'
import '../Login_Signup.css';
import {Link} from 'react-router-dom';

export class Login extends Component {
    render() {
        return (
            <div>
                <div className="nav1"></div>
                    <div className="head">
                        <div className="main-head">
                            
                            <div className="green1"></div>
                            <div className="grey1">
                                
                                <h1 className="title1">Welcome !</h1>
                                
                                <form className="form1">

                                    <input className="input1" type='email' required placeholder='email-id'></input><br></br>
                                    <input className="input1" type='password' required placeholder='password'></input>
                                    <div>
                                    <Link to="/StudentDashboardMain" style={{ textDecoration: 'none' }} ><button className="button1" type="submit" title='incorrect password!Try again' >Login</button></Link>
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

