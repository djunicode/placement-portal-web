import React, { Component } from 'react';
import Modals from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css_styling/display.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'

class EditDetail extends Component{
  constructor(props)
  {
    super(props);
    this.saveModalDetails = this.saveModalDetails.bind(this);

    this.state={
      
      modalIsOpen : false,
      name: 'Google',
    category:'Super-Dream',
    link:'www.googleinfo.com',
  
    addFields:[{
      position:'Computer-engineer',
       noOfPos:5,
       Interviewdate:'24-06-2020',
    deadline:'24-05-2020',
    packages:'Rs.24,00,000',
    addDets:'The criteria as mentioned on the website needs to be fulfilled so as to apply for the interview'}, 
  ]
  }
  }
saveModalDetails=(company)=>{
 this.setState({
    addFields:company.addFields,
    name:company.name,
    link:company.link,
    category:company.category,
    modalIsOpen: !company.modalIsOpen
 })
 // console.log(this.state)
}
toggleModalEdit=()=>{
  this.setState({
      modalIsOpen : ! this.state.modalIsOpen,  
  });
console.log(this.state)
}
  render(){
    const company=this.state
      return(
        <div className="EditDetail">
         
          <div className="imdgrid">
          </div> 
      <h2 className="compName">{company.name}</h2>
          <div className="editProf" onClick={this.toggleModalEdit.bind(this)}>
          <FontAwesomeIcon icon={faPencilAlt} />
            <p className="center fontEdit">Edit Details</p>
          </div>
        <div className="editGreen">
        <div className="bgw">
        <div className="grid-item"><form>
      <h4 className="dets"><span style={{fontWeight:700}}>Category :</span> {company.category}</h4>
      <br/>
    <div className="edit" >
    {
          this.state.addFields.map((field,index)=>{
          
            return(
              <div key={index}>
                 
    <div className="editGrid">
    <h4 className="dets"><span style={{fontWeight:700}}>Position :</span> {field.position}</h4> 
    <h4 className="dets"><span style={{fontWeight:700}}>Number Of Position :</span> {field.noOfPos}</h4>
    <h4 className="dets"><span style={{fontWeight:700}}>Interview Date :</span> {field.Interviewdate}</h4>
    <h4 className="dets"><span style={{fontWeight:700}}>Deadline :</span> {field.deadline}</h4>
    <h4 className="dets"><span style={{fontWeight:700}}>Package:</span> {field.packages}</h4>
</div>
<h4 className="dets"><span style={{fontWeight:700}}>Add Details :</span> {field.addDets}</h4>  
</div>    
             
            )

          })
        }
  </div>
  <br/>
<h4 className="dets"><span style={{fontWeight:700}}>Link : </span>{company.link}</h4>  
       </form>
       </div>   
           </div>
        </div>
        <Modals name={this.state.name} category={this.state.category} link={this.state.link} modalIsOpen={this.state.modalIsOpen} addFields={this.state.addFields} toggleModalEdit={this.toggleModalEdit}saveModalDetails={this.saveModalDetails}/>
      </div>
      
      )
  }  
}
export default EditDetail



 
 
        
  
