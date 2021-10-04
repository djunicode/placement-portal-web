import React from 'react';
import StudentDashboard from '../components/StudentDashboard.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_stylings/StudentDashboard.css';
import Navbar from '../components/StudentDashboardNavbar.js';
import StudentTab from '../components/StudentDashboardTab.js';
 import '../css_stylings/StudentDashboardTab.css';
 import '../css_stylings/StudentDashboardNavbar.css';
 import '../css_stylings/StudentDashboardMain.css';

function StudentDashboardMain() {
  return (
    <div className="App_studentdashboard">
        <div className="top-nav_studentdashboard fixed-top"></div>
      <div className="row actual_studentdashboard">
        <div className="col-lg-9">
          <StudentDashboard></StudentDashboard>
        </div>
        <div className="col-lg-3">
          <StudentTab></StudentTab>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardMain;
