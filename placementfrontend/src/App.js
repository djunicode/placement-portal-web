
import React from 'react';
import './Login_Signup.css';
import Login from './pages/Login.js'
import StudentSU from './pages/StudentSU.js'
import StaffSU from './pages/StaffSU.js'
import { BrowserRouter, Route } from 'react-router-dom';
import StudentDashboardMain from './pages/StudentDashboardMain.js';
import CompanyMain from './pages/CompanyMain.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <StudentDashboardMain></StudentDashboardMain>
        {/* <CompanyMain></CompanyMain> 
        <Route exact path='/' component={Login}>
          <Login />
        </Route>
        <Route exact path='/studentSignup' component={StudentSU}>
        </Route>
        <Route path='/staffSignup' component={StaffSU}>
        </Route> */}
      </div>
    </BrowserRouter>

  );
}

export default App;
