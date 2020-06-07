import React from 'react';
import profile from "../assets/dummy.png";
function Sidenav() {
    return (
        <div className="col-lg-2  col-sm-6 my-2 Studentprofile_side ">
            <img src={profile} alt="profile" className="Studentprofile_pic1" />
            <br />
            <h4>Name</h4>
            <h4>Other</h4>
        </div>
    );
}
export default Sidenav;
