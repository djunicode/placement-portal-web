
import React from 'react';
import './Login_Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.js'
import StudentSU from './pages/StudentSU.js'
import StaffSU from './pages/StaffSU';
import AddDetails from './pages/AddDetails';
import DisplayDetails from './pages/DisplayDetails';
// import StaffSU from './pages/StaffSU.js'
import Studentprofile from './pages/Studentprofile';
import PlacementCoDashboard from './pages/PlacementCoDashboard'
import Tpo2 from './pages/Tpo2';
import { BrowserRouter, Route } from 'react-router-dom';
import StudentDashboardMain from './pages/StudentDashboardMain.js';
import CompanyMain from './pages/CompanyMain.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      {/* <StudentDashboardMain></StudentDashboardMain> */}
        {/* <CompanyMain></CompanyMain> 
        <Route exact path='/' component={Login}>

        {/*<Route exact path='/' component={Login}>
          <Login />
        </Route>
        <Route exact path='/studentSignup' component={StudentSU}>
        </Route>
        <Route path='/staffSignup' component={StaffSU}>
        </Route> */}
        <AddDetails />
        <DisplayDetails /> 
        {/*<Tpo2 />*/}
        {/* <Tpo2 /> */}
      </div>

    </BrowserRouter>

  );
}

export default App;
