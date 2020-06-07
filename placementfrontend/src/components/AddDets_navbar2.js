import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/display.css';
import {Link} from 'react-router-dom';


function NavR2(){
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
    export default NavR2;