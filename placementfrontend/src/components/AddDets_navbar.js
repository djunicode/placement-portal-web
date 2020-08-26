import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/addComp.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


class NavR extends Component{


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
        <div className="NavR_topnav">
   <Link to="/add" className ="NavR_anchor"style={{ textDecoration: 'none' }} >RECRUITERS</Link>
  <Link to="/Tpo2" className ="NavR_anchor"style={{ textDecoration: 'none' }} >STUDENTS</Link>
  <form>

  <div className="NavR_search-container">
  <input type="text"  placeholder="Search"/>
  <FontAwesomeIcon icon={faSearch} className="searchIcon" />
  </div>
 
  </form>
  <div className="NavR_logout" onClick={this.handleClick}>
  <FontAwesomeIcon icon={faSignOutAlt}  className="logoutIcon" />
  </div>

   {/* <div className="search-container">
    <form >
    <div className="inner-addon right-addon">
    <FontAwesomeIcon icon={faCoffee} />
    <input type="text"  placeholder="Name:"  name="name"  required/>
</div>  
      
     </form>
  </div>  */}
</div>

    )}}
    export default NavR;
  