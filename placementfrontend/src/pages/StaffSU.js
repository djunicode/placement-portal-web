import React, { Component } from 'react'
import '../Login_Signup.css';
import {Link} from 'react-router-dom';

export class StaffSU extends Component {
    render() {
        return (
            <div>
                <div className="nav2"></div>
                
                <div className="grey2" ></div>
                
                <div className="white3" >
                    
                    <h1 className="title3">Staff Sign-Up</h1>
                    
                    
                    <form className="form2">
                        <span className="G1" >
                            <input required className="input3"  placeholder='first name'></input>
                            <input required className="input3" placeholder='last name'></input>
                        </span>
                        {/* <span style = {Styles.g2}>
                            <input required className="inputBox" style={Styles.inputBox} type='number' placeholder='sap-id'></input>
                            <input required className="inputBox" style={Styles.inputBox} type='number' placeholder='pointer'></input>
                        </span> */}
                        
                        <span className = "G3" >
                            {/* <select required className="inputBox" style={Styles.inputBox} placeholder='year'>
                                <option style={Styles.dis} selected disabled hidden>year</option>
                                <option>17-20</option>
                                <option>18-21</option>
                                <option>19-22</option>
                            </select> */}
                            <select required className="input3"  placeholder='dept.'>
                                <option value="" className="dis2" selected disabled hidden>dept.</option>
                                <option value="Computers">Computers</option>
                                <option value="IT">IT</option>
                                <option value="EXTC"> EXTC</option>
                                <option value="Chemical">Chemical</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                        </span>
                        
                        <span className="email3">
                            <input required className="input2" type='email' placeholder='email-id'></input>
                        </span>                  
                        <span className="pass3">
                            <input required className="input2"  type='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder='password'></input>
                        </span>
                        <div>
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

const Styles = {
   
    
    title:{
        textAlign:'center',
        color:'rgba(74,74,74)',
        textTransform:'uppercase',
        fontSize:'2em',
        marginTop:'60px',
        fontWeight:'200'
    },
    inputBox:{
        height:'45px',
        width:'90%',
        float:'left',
        border:'none',
        borderBottom:'1px solid rgba(153,153,153)',
        fontSize:'1em',
        padding:'0px 5px',
        borderSizing:'borderBox',
    
    },

    Button:{
        textAlign:'center',
        color:'rgba(74,74,74)',
        fontWeight:'200',
        backgroundColor:'',
        width:'calc((100%))',
        zIndex:'5',
        backgroundColor: 'rgba(147,213,201,0.5)',
        height:'55px',
        borderRadius:'20px',
        border:'none',
        fontSize:'1.5em',
        textTransform:'uppercase',
        marginTop:'55px',
        position:'absolute',
        top:'45%',
        letterSpacing:'1px'
    },
    register:{
        textAlign:'center',
        fontSize:'1em',
        marginTop:'15px',
        color:'rgb(153,153,153)',
        position:'absolute',
        top:'65%'
    },
    reg:{
        cursor:'pointer',
        fontWeight:'bold',
        color:'black'
    },
    g1 :{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '10px',
        position:'absolute',
        top:'5%'
      },
 
    g3 :{
        position:'absolute',
        top:'17%',
        // display: 'grid',
        // gridTemplateColumns: '1fr 1fr',
        height: '10px',
        width:'50%'
      },
    email:{
        position:'absolute',
        top:'28%'
    },
    pass:{
        position:'absolute',
        top:'38%'
    },
    dis:{
        color:'#565656'
    }


}

export default StaffSU
