
import React from 'react';
import './Login_Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.js'
import StudentSU from './pages/StudentSU.js'
import StaffSU from './pages/StaffSU';
import AddDetails from './pages/AddDetails';
import DisplayDetails from './pages/DisplayDetails';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* <Route exact path='/' component={Login}>
          <Login />
        </Route>
        <Route exact path='/studentSignup' component={StudentSU}>
        </Route>
        <Route path='/staffSignup' component={StaffSU}>
        </Route> */} 
        <AddDetails/>
       <DisplayDetails/>  
      </div>

    </BrowserRouter>

  );
}

export default App;
