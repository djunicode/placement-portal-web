import React from 'react';
function Nav(){
    return(
    <div className="container">
    <div className="col-lg-12">
     <div className="topnav">
     <div className="col-12"><a className="active" href="#home">RECRUITERS</a></div>
     <div className="col-12"><a href="#about">STUDENTS</a></div>
      <a href="#contact">RECORDS</a>               
        <form className="form-group float-right ">
                <input className="form-control inp2" type="search" placeholder="Search"/>
                <button className="btn"><i className="fa fa-search glass2"></i></button>       
        </form>
    </div>
    </div>
    </div>
    )}
    export default Nav;