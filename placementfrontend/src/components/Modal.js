import React, { Component } from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'

class Modals extends Component {
  constructor(props)
  {
    super(props);
    this.handleSave=this.handleSave.bind(this);
    this.state={
      modalIsOpen : false,
      name: this.props.name,
    category:this.props.category,
    link:this.props.link,
    addFields:this.props.addFields
    }
  }
  
    componentWillReceiveProps(nextProps){
      this.setState({
        name: nextProps.name,
       category:nextProps.category,
        modalIsOpen:nextProps.modalIsOpen,
        link:nextProps.link,
        addFields:this.props.addFields
      });
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
   
    //console.log(this.state)
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
handleSave() {
  console.log(this.state);
  this.props.saveModalDetails(this.state);
}

  render() {
        const company=this.state
        const toggleModalEdit=this.props.toggleModalEdit
       
        return (
            <div>
                <Modal isOpen={company.modalIsOpen} >
                <ModalHeader toggle={ ()=>toggleModalEdit()}>
                    Edit Details
                </ModalHeader>
                <ModalBody>
                <div className="grid-item"><form onSubmit={this.handleSave} >
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

         
        
<input type="text" className="addInput" defaultValue={company.link} placeholder="Link" onChange={this.handleChange} name="link"   required="required" />  
        
        </form></div>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btnModal"  onClick={() => { this.handleSave()}}>Save</button>
                    <button className="btnModal" onClick={() => { toggleModalEdit()}} >cancel</button>
                </ModalFooter>
            </Modal>
            
            </div>




        )}
}
export default Modals;