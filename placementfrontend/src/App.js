
import React from 'react';
import './Login_Signup.css';
import Login from './Pages/Login.js'
import StudentSU from './Pages/StudentSU.js'
import StaffSU from './Pages/StaffSU.js'
import {BrowserRouter,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          
        <Route exact path='/' component={Login}>
          <Login />
        </Route>
        <Route exact path='/studentSignup' component={StudentSU}>
        </Route>
        <Route path='/staffSignup' component={StaffSU}>
        </Route>
      </div>
   </BrowserRouter>

  );
}

export default App;
