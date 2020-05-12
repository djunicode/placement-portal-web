import React from 'react';
import CompanyPage from '../components/CompanyPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_stylings/CompanyPage.css';
import Navbar from '../components/CompanyNavbar.js';
import StudentTab from '../components/CompanyStudentTab.js';
import '../css_stylings/CompanyNavbar.css';
import '../css_stylings/CompanyStudentTab.css';
import '../css_stylings/CompanyMain.css';


function CompanyMain() {
  return (
    <div className="App">
        <div className="top-nav">
          <Navbar></Navbar>
        </div>
      <div className="row">
        <div className="col-lg-3">
          <StudentTab></StudentTab>
        </div>
        <div className="col-lg-9">
          <CompanyPage></CompanyPage>
        </div>
      </div>
      
    </div>
  );
}

export default CompanyMain;
