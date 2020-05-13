import React, { Component } from 'react'
import '../Login_Signup.css';
import {Link} from 'react-router-dom';

export class StudentSU extends Component {
    render() {
        return (
            <div>
                <div className="nav2"></div>
                
                <div className="grey2"  >
                
                <div className="white2"  >
                    
                    <h1 className="title2" >Student Sign-Up</h1><br></br>
                    
                    
                    <form className="form2">
                        <span className = "g1" >
                            <input required className="input2" placeholder='first name'></input>
                            <input required className="input2" placeholder='last name'></input>
                        </span><br></br>
                        <span className = "g2">
                            <input required className="input2"  type='number' placeholder='sap-id'></input>
                            <input required className="input2"  type='number' placeholder='pointer ' style={{width:'70%'}}></input>
                        </span><br></br>
                        
                        <span className = "g3" >
                            <select required className="input2" placeholder='year'>
                                <option className="dis2" selected disabled hidden value="">year</option>
                                <option value='17'>17-20</option>
                                <option value="18">18-21</option>
                                <option value="19">19-22</option>
                            </select>
                            <select required className="input2"  placeholder='dept.'>
                                <option value="" className="dis2"  selected disabled hidden>dept.</option>
                                <option value="Computers">Computers</option>
                                <option value="IT">IT</option>
                                <option value="EXTC"> EXTC</option>
                                <option value="Chemical">Chemical</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                        </span> <br></br>
                        
                        <span className="email2">
                            <input required className="input2" type='email' placeholder='email-id'></input>
                        </span>  <br></br>                
                        <span className="pass2">
                            <input required className="input2"  type='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder='password'></input>
                        </span><br></br>
                        <div className="bind2">
                            <button className="input2 button2"
                              type="submit">SIGNUP</button><br></br>
                            <p className="register2">
                                registered user?<Link to="/" style={{ textDecoration: 'none' }} ><span className="reg2" > Login</span></Link>
                            </p>
                        </div>
                    </form>
                    
                </div> 
                </div> 
     
                    
            </div>
        )
    }
}



export default StudentSU
