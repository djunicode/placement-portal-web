import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css_styling/display.css'

class EditDetail extends Component{

  render(){
    
      return(
        <div className="wrapper">
          <div className="overlap">
          <div className="imdgrid">
          </div> 
          <h4 class="compName">COMPANY NAME</h4>
          <div class="editProf">
          <FontAwesomeIcon icon={faPencilAlt} />
            <p className="center fontEdit">Edit Details</p>

          </div>
          </div>
        <div className="editGreen">
        <div className="bgw">
        <h4 className="CompanyDetails">Company Details</h4>
        <br/>
        
       <div className="grid-item">
        
           <h4 className="info"> Name : Google</h4>
           <h4 className="info">Category : Super Dream</h4>
           <h4 className="info">Position : Computer Engineer</h4>
         
           <h4 className="info">Interview Date : 24/5/2020</h4>
           <h4 className="info">Deadline : 24/4/2020</h4>
           <h4 className="info">Package : Rs.24,00,000</h4>
         
           <h4 className="info">Add Details : Criteria has to be fulfilled</h4>
         
          
           </div>
        </div>
      </div>
      </div>
      )
  }  
}
export default EditDetail



 
 
        
  
