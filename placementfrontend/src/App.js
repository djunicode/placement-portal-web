
import React from 'react';
import './Login_Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.js'
import StudentSU from './pages/StudentSU.js'
import StaffSU from './pages/StaffSU';
import AddDetails from './pages/AddDetails';
import DisplayDetails from './pages/DisplayDetails';
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

          <Route exact path='/StudentDashboardMain' component={StudentDashboardMain}/>  
            <Route exact path='/' component={Login}></Route>
        <Route exact path='/studentSignup' component={StudentSU}/>
        <Route path='/staffSignup' component={StaffSU}/>
        
        <Route exact path='/add' component={AddDetails}/> 
        <Route exact path='/display' component={DisplayDetails}/> 

           <Route exact path='/CompanyMain' component={CompanyMain}/>
           <Route exact path='/Tpo2' component={Tpo2}/>
            
            {/* Routes yet to be setup*/}
           <Route exact path='/PlacementCoDashboard' component={PlacementCoDashboard}/> 
           <Route exact path='/Studentprofile/:studentId' component={Studentprofile}/>
        
           {/* <Link to="/" style={{ textDecoration: 'none' }}  /> */}
      </div>

    </BrowserRouter>

  );
}

export default App;
