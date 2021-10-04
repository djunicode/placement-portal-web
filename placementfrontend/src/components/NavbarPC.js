import React from 'react';
import axios from 'axios';
function handleClick(){
    const auth_token = localStorage.getItem('token')
    axios(`http://kanishkshah.pythonanywhere.com/api/auth/token/logout/`,{
         headers:{
               'Authorization': 'Token '+ auth_token
        }
    })
    .then(res => {
        localStorage.removeItem('token')
    })    
} 

function Nav(){
    return(
    <div className="container">
    <div className="col-lg-12">
     <div className="Tpo2_topnav">
     <div className="col-12"><a className="active"  href="#home">HOME</a></div>
     <div className="col-12"><a href="#about" style={{color:"black"}}>RECORDS</a></div>
     <div className="col-12"><a href="#" className="logout_link" onClick={handleClick}>LOG OUT</a></div>  
        <form className="form-group float-right ">
                <input className="form-control Tpo2_inp2" type="text" placeholder="Search"/>
                <button className="btn"><i className="fa fa-search Tpo2_glass2"></i></button>       
        </form>
    </div>
    </div>
    </div>
    )}
    export default Nav;