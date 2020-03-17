import React from 'react';
import Profile from '../assets/default.png';
import '../css_styling/addComp.css'


function Sidenav(){
    return(
       
            <div className="container">
                 <div className="profimg">
<img src={Profile} alt="img" className="center imgno" />
<h4 className="center"> ADMIN</h4>
<p className="center">........</p>
</div> 
        </div>
       
    )}

  export default Sidenav;