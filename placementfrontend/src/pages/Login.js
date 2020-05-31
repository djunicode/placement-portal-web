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

export default Login

