import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/addComp.css';
import {Link} from 'react-router-dom';


function NavR(){
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

   {/* <div className="search-container">
    <form >
    <div className="inner-addon right-addon">
    <FontAwesomeIcon icon={faCoffee} />
    <input type="text"  placeholder="Name:"  name="name"  required/>
</div>  
      
     </form>
  </div>  */}
</div>

    )}
    export default NavR;
  