import React from 'react';
import {Link} from 'react-router-dom';
function Nav(){
    return(
    <div className="container">
    <div className="col-lg-12">
     <div className="Tpo2_topnav">
   
     <div className="col-12">  <Link to="/add" style={{ textDecoration: 'none' ,color:'#000' }} >RECRUITERS</Link></div>
     <div className="col-12">  <Link to="/Tpo2" style={{ textDecoration: 'none',color:'#000' }} >STUDENTS</Link></div>
        <form className="form-group float-right ">
                <input className="form-control Tpo2_inp2" type="text" placeholder="Search"/>
                <button className="btn"><i className="fa fa-search Tpo2_glass2"></i></button>       
        </form>
    </div>
    </div>
    </div>
    )}
    export default Nav;