import React from 'react';
// import profile from "../assets/dummy.png";
const Sidenav = (props) => {
    return (
        <div className="col-lg-2  col-sm-6 my-2 Studentprofile_side ">
            <img src={props.coordinator.profile_image} alt="profile" className="Studentprofile_pic1" />
            <br />
            <h4>{props.coordinator.f_name} {props.coordinator.l_name}</h4>
            <h4>{props.coordinator.department}</h4>
            <div className="side_nav_email_container">
            <h4 className="side_nav_email">{props.coordinator.email}</h4>
            </div>
        </div>
    );
}
export default Sidenav;
