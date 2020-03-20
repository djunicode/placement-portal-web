import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css_styling/display.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'

class EditDetail extends Component{
  state={
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
handleChange = (e) => {
  if(["position","noOfPos","Interviewdate","deadline","packages","addDets"].includes(e.target.name)){
    let addFields = [...this.state.addFields]
    addFields[e.target.dataset.id][e.target.name] = e.target.value;
    this.setState({
      addFields  : addFields
    });
  }
  else{
    this.setState({
      [e.target.name] : e.target.value
    });
  }
 
  console.log(this.state)
}
handleAddMore=(e)=>
{
  let addFields={
    position:"",
    noOfPos:"",
    Interviewdate:"",
    deadline:"",
    packages:"",
    addDets:""}
{
this.setState((prevState) =>({addFields:[...prevState.addFields,addFields]}));
}
//   e.preventDefault();
//   var text= document.getElementById('wrapper').innerHTML
// document.getElementById('wrapper').innerHTML += text; 
}
onFocus= (e)=>{
e.currentTarget.type = "date";
}
onBlur=(e)=>{
e.currentTarget.type = "text";

}
handleSubmit = (e) => {
  e.preventDefault();
  console.log(this.state)
}
toggleModal(){
  this.setState({
      modalIsOpen : ! this.state.modalIsOpen
  });
}

  render(){
    const company=this.state
      return(
        <div className="EditDetail">
         
          <div className="imdgrid">
          </div> 
      <h2 className="compName">{company.name}</h2>
          <div className="editProf" onClick={this.toggleModal.bind(this)}>
          <FontAwesomeIcon icon={faPencilAlt} />
            <p className="center fontEdit">Edit Details</p>
          </div>
          
        <div className="editGreen">
        <div className="bgw">
        <div className="grid-item"><form onSubmit={this.handleSubmit}>
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
        <Modal isOpen={this.state.modalIsOpen} >
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                    Edit Details
                </ModalHeader>
                <ModalBody>
                <div className="grid-item"><form >
         <div className="editGridModal">
          <input type="text"  defaultValue={company.name}  placeholder="Name:"   onChange={this.handleChange} name="name"  required/>
          <select className="form-control"  defaultValue={company.category} id="exampleFormControlSelect1"placeholder="Category:" onChange={this.handleChange} name="category"  required>
            <option disabled selected hidden>Category:</option>
      <option>Super-Dream</option>
      <option>Dream</option>
      <option>Regular</option>
    </select> </div>
    <div className="editMore" >
    {
          this.state.addFields.map((field,index)=>{
            let position = `position-${index}`, addDets = `addDets-${index}` ,packages = `packages-${index}`,deadline = `deadline-${index}`,Interviewdate = `Interviewdate-${index}` , noOfPos = `noOfPos-${index}`  
            return(
              
              <div key={index}>
                 
    <div className="editMoreGrid">
          <input type="text" className="addInput"placeholder="Position:"  defaultValue={field.position} data-id={index} id={position}  onChange={this.handleChange}  name="position" required/>
 <input type="number" className="addInput"placeholder="Number Of Position:"   defaultValue={field.noOfPos}  data-id={index} id={noOfPos} onChange={this.handleChange} name="noOfPos" required min="0" />
         <input type="text"className="addInput"placeholder="Interview Date:" defaultValue={field.Interviewdate}  data-id={index} id={Interviewdate}  onFocus = {this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} name="Interviewdate" required />
         <input type="text"className="addInput"placeholder="Deadline:"  defaultValue={field.deadline} data-id={index} id={deadline}  onFocus = {this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} name="deadline"  required />
 <input type="text"className="addInput" placeholder="Package:" defaultValue={field.packages}  data-id={index} id={packages}  onChange={this.handleChange} name="packages"  required/>   
</div>
<input type="text" className="addInput"placeholder="Add Details" defaultValue={field.addDets} data-id={index}  id={addDets} onChange={this.handleChange} name="addDets" required />  


</div> 

                
             
            )

          })
        }
  
<button className="editMoreBtn" onClick={this.handleAddMore}><span className="center" style={{marginBottom:'5px'}}>+</span></button>  </div>

         
        
<input type="text" className="addInput" defaultValue={company.link} placeholder="Link" onChange={this.handleChange} name="link" required />  
        
        </form></div>
                </ModalBody>
                <ModalFooter>
                    <button class="btnModal"  onClick={this.handleSubmit}>Save</button>
                    <button class="btnModal" onClick={this.toggleModal.bind(this)} >cancel</button>
                </ModalFooter>
            </Modal>
      </div>
      
      )
  }  
}
export default EditDetail



 
 
        
  
