import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/addComp.css'


function Nav(){
    return(
        <div className="topnav">
  <a className="active" href="#home">RECRUITERS</a>
  <a href="#about">STUDENTS</a>
  <a href="#contact">RECORDS</a>
  <form>

  <div className="search-container">
  <input type="text"  placeholder="Search"/>
  <FontAwesomeIcon icon={faSearch} />
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
    export default Nav;
  