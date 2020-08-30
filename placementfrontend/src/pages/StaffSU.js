import React, { Component } from 'react'
import '../Login_Signup.css';
import {Link} from 'react-router-dom';
import axios from 'axios'

export class StaffSU extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            message:"",
            fname:"",
            lname:"",
            dept:"",
            email:"",
            pwd:""
        };
      }
    
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        const user = {
            f_name: this.state.fname ,
            l_name: this.state.lname,
            email: this.state.email ,
            department: this.state.dept,	
            password: this.state.pwd,
            password2: this.state.pwd       
        }

        const login_user ={
            password: this.state.pwd,
            email: this.state.email 
        }
        
        axios
        .post(`http://kanishkshah.pythonanywhere.com/coordinator_signup/`,user)
        .then(res => {
            // console.log(res)
            axios
            .post(`http://kanishkshah.pythonanywhere.com/api/auth/token/login/`,login_user)
            .then(response => {
                console.log(response.data.auth_token)
                localStorage.setItem('token',response.data.auth_token)
                this.props.history.push('/add')
            })
            .catch(err => {
                this.setState({
                    message:err.response.data.email[0]
                })
                // console.log(this.state.message)
            })
        })
        .catch(err => {
            this.setState({
                message:err.response.data.email[0]
            })
            // console.log(this.state.message)
        })
    }
    render() {
        var message = this.state.message
        return (
            <div>
                <div className="nav2"></div>
                
                <div className="grey2" ></div>
                
                <div className="white3" >
                    
                    <h1 className="title3">Staff Sign-Up</h1>
                    
                    
                    <form className="form2" onSubmit={this.handleSubmit}>
                        <span className="G1" >
                            <input required className="input3"  onChange={this.handleChange} name="fname" placeholder='First Name'></input>
                            <input required className="input3" onChange={this.handleChange} name="lname" placeholder='Last Name'></input>
                        </span>
                        
                        <span className = "g3" >
                            <select required  onChange={this.handleChange} name="dept" className="input3"  placeholder='Dept.'>
                                <option value="" className="dis2" selected disabled hidden>dept.</option>
                                <option value="COMPS">Computers</option>
                                <option value="IT">IT</option>  
                                <option value="EXTC"> EXTC</option>
                                <option value="PROD">Production</option>
                                <option value="ELEX">Electronics</option>
                                <option value="MECH">Mechanical</option>
                                <option value="BIO">Biomedical</option>
                                <option value="CHEM">Chemical</option>
                                <option value="HUM">HUM</option>
                            </select>
                           
                        </span>
                        
                        <span className="email3">
                            <input required className="input2" type='email' placeholder='Email-ID' onChange={this.handleChange} name="email"></input>
                        </span>                  
                        <span className="pass3">
                            <input required  onChange={this.handleChange} name="pwd" className="input2"  type='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder='Password'></input>
                        </span>
                        <div>
                            <div style={{color:'red',fontSize:'75%',position:'absolute'}}>{this.state.message}</div>
                        {/* <Link to="/add" style={{ textDecoration: 'none' }}  > <button className="input3 button3"
                               type="submit">SIGNUP</button></Link> */}
                                <button className="input3 button3"
                               type="submit">SIGNUP</button>
                            <p className="register3">
                                registered user?<Link to="/" style={{ textDecoration: 'none' }}  ><span className="reg3"> Login</span></Link>
                            </p>
                        </div>
                    </form>
                    
                </div>  
     
                    
            </div>
        )
    }
}

export default StaffSU