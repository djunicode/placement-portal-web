import React, { Component } from 'react'
import '../Login_Signup.css';
import {Link} from 'react-router-dom';
import axios from 'axios'

export class StudentSU extends Component {
    constructor(props){
        super(props)
        this.state={
            message:"",
            f_name:"",
            l_name:"",
            department:"",
            email:"",
            password:"",
            sap_ID:"",
            year:"",
            pointer:""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        const user = {
            f_name: this.state.f_name ,
            l_name: this.state.l_name,
            email: this.state.email ,
            sap_ID: this.state.sap_ID,
            department: this.state.department,
            year: this.state.year,
            pointer: this.state.pointer,
            password: this.state.password,
            password2: this.state.password       
        }
        const login_user = {
            password: this.state.password,
            email: this.state.email 
        }
        
        axios
        .post(`http://kanishkshah.pythonanywhere.com/student_signup/`,user)
        .then(res => {
            // console.log(res)
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
                    message:err.response.data.email[0]
                })
                // console.log(this.state.message)
            })
        })
        .catch(err => {
            if(err.response.data.email){
                this.setState({
                    message:err.response.data.email[0]
                })
            }
            if(err.response.data.pointer){
                this.setState({
                    message:err.response.data.pointer[0]
                })
            }
            if(err.response.data.sap_ID){
                this.setState({
                    message:err.response.data.sap_ID[0]
                })
            }
        })
    }

    render() {
        return (
            <div>
                <div className="nav2"></div>
                
                <div className="grey2"  >
                
                <div className="white2"  >
                    
                    <h1 className="title2" >Student Sign-Up</h1><br/>
                    <div style={{color:'red',fontSize:'75%',margin:'0px 30px'}}>{this.state.message}</div>
                    <form className="form2" onSubmit={this.handleSubmit}>
                        <span className = "g1" >
                            <input required className="input2" onChange={this.handleChange} name="f_name"  placeholder='First Name'></input>
                            <input required className="input2" onChange={this.handleChange} name="l_name"  placeholder='Last Name'></input>
                        </span><br></br>
                        <span className = "g2">
                            <input required className="input2" onChange={this.handleChange} name="sap_ID"  type='number' placeholder='Sap-ID'></input>
                            <input required className="input2" onChange={this.handleChange} name="pointer"   type='number' placeholder='Pointer ' style={{width:'70%'}}></input>
                        </span><br></br>
                        
                        <span className = "g3-2" >
                            <select onChange={this.handleChange} name="year"  required className="input2" placeholder='Year'>
                                <option className="dis2" selected disabled hidden value="">year</option>
                                <option value='TE'>TE</option>
                                <option value="BE">BE</option>
                            </select>
                            <select  onChange={this.handleChange} name="department" required className="input2"  placeholder='Dept.'>
                                <option value="" className="dis2"  selected disabled hidden>dept.</option>
                                <option value="COMPS">Computers</option>
                                <option value="IT">IT</option>
                                <option value="PROD">Production</option>
                                <option value="MECH">Mechanical</option>
                                <option value="BIO">Biomedical</option>
                                <option value="EXTC"> EXTC</option>
                                <option value="CHEM">Chemical</option>
                                <option value="ELEX">Electronics</option>
                            </select>
                        </span> <br></br>
                        
                        <span className="email2">
                            <input required className="input2" type='email' name="email" onChange={this.handleChange}  placeholder='Email-ID'></input>
                        </span>  <br></br>                
                        <span className="pass2">
                            <input required className="input2" name="password"  type='password' onChange={this.handleChange}  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder='Password'></input>
                        </span><br></br>
                        <div className="bind2">
                        <button className="input2 button2"
                             type="submit">SIGNUP</button>
                        {/* <Link to="/StudentDashboardMain" style={{ textDecoration: 'none' }} ><button className="input2 button2"
                             type="submit">SIGNUP</button></Link>
                              */}<br></br>
                             
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