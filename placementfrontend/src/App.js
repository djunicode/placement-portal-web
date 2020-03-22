
import React from 'react';
import './Login_Signup.css';
import Login from './pages/Login.js'
import StudentSU from './pages/StudentSU.js'
import StaffSU from './pages/StaffSU.js'
import Studentprofile from './pages/Studentprofile';
import Tpo2 from './pages/Tpo2';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/*<Route exact path='/' component={Login}>
          <Login />
        </Route>
        <Route exact path='/studentSignup' component={StudentSU}>
        </Route>
        <Route path='/staffSignup' component={StaffSU}>
  </Route>*/}
      {/*<Tpo2 />*/}
      <Studentprofile />
      </div>
    </BrowserRouter>

  );
}

export default App;
