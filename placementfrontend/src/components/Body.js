import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  dummy from "../assets/dummy.png";
import Sidenav from './Sidenav';
import Search from './Search';
function Body(){
    return(
        <div className="container-fluid">
            <div  className="row d-flex py-5">
                <Sidenav />
                <div className="col-lg-10">
                    <div className="row py-4">
                       <Search />
                    </div>
                    <div className="row m-3 ">
                        <div className="col-12 pt-3 box">                         
                            <div className="col-10  p-0 inner_box "> 
                                    <img src={dummy} alt="profile" className="pic2" /> 
                                    <h2 className="head">STUDENT'S NAME</h2>
                                    <button className="edit float-right"><i className="fa fa-pencil"></i> EDIT PROFILE</button>
                                    <div className="row">
                                        <div className="inner_details m-1">     
                                            <div className="row ml-1  inner_blocks">
                                                <div className="col-10 ">
                                                    <h6>Detail</h6>
                                                    <h6>Detail</h6>
                                                </div>                        
                                            </div>                                                             
                                        </div>
                                        <div className="inner_details m-1">
                                            <div className="row ml-1 inner_blocks">
                                                <div className="col-10">
                                                    <h6>Detail</h6>
                                                    <h6>Detail</h6>
                                                </div>                        
                                            </div>                                                             
                                        </div>
                                        <div className="inner_details m-1">
                                            <div className="row ml-1 inner_blocks">
                                                <div className="col-10">
                                                    <h6>Detail</h6>
                                                    <h6>Detail</h6>
                                                </div>                        
                                            </div>                                                             
                                        </div>
                                        <div className="inner_details m-1">
                                            <div className="row ml-1 inner_blocks">
                                                <div className="col-10">
                                                    <h6>Detail </h6>
                                                    <h6>Detail </h6>
                                                </div>                        
                                            </div>                                                             
                                        </div>                               
                                </div>
                            </div>                  
                        </div>                    
                    </div>
                </div>        
            </div>    
       </div>
    );
}
export default Body;