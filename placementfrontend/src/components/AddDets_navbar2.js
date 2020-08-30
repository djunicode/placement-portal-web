import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/display.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


class NavR2 extends Component{


    handleClick = (e) =>
        {
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
        render(){
    return(
        <div className="NavR2_topnav">
 <Link to="/display" className ="NavR2_anchor"  style={{ textDecoration: 'none' }} >NAME</Link>
  <Link to="/CompanyMain"  className ="NavR2_anchor" style={{ textDecoration: 'none' }} >APPLICANTS</Link>
  
  <form>
 
  <div className="NavR2_search-container">
  <input type="text"  placeholder="Search"/>
  <FontAwesomeIcon icon={faSearch} className="searchIcon"  />
  </div>
  </form>
  <div className="NavR_logout" onClick={this.handleClick}>
  <FontAwesomeIcon icon={faSignOutAlt} className="logoutIcon" />
  </div>


</div>

    )}}
    export default NavR2;