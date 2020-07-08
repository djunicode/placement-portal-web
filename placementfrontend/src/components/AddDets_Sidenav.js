import React from 'react';
import Profile from '../assets/default.png';
import '../css_styling/addComp.css';



function SidenavR(){
    return(
       
            <div className="container">
                 <div className="profimg">
<img src={Profile} alt="img" className="SidenavR_center SidenavR_imgno" />
<h4 className="SidenavR_center"> ADMIN</h4>
<p className="SidenavR_center">........</p>
</div> 
        </div>
       
    )}

  export default SidenavR;  