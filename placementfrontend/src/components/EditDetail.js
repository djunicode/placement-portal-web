import React, { Component } from 'react';
import Modals from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css_styling/display.css';
import axios from 'axios';

class EditDetail extends Component{
  constructor(props)
  {
    super(props);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    console.log(props)
    this.state={
      modalIsOpen : false,
      name: '',
    category:'',
    link:'',
    addFields:[{
      id:'',
      position:'',
       noOfPos:null,
       Interviewdate:'',
    deadline:'',
    packages:'',
    addDets:''}, 
  ]
  }
  }
   componentDidMount(){
    const companyId =this.props.companyId
    console.log(companyId)
    axios.get(`http://kanishkshah.pythonanywhere.com/positions/`)
    .then(res=>{
      console.log(res.data)
      const data = res.data
      const companyDetails = data.filter(comp=> comp.company.id == companyId)
      this.handleData(companyDetails)
      console.log(companyDetails)
    })
    .catch(err => console.log(err));
   }
   handleData=(companyDetails)=>{
    let addPos =[]
    companyDetails.map(position=>{
      addPos = [...addPos,{
        id:position.id,
         position:position.title,
         packages:position.package,
         deadline:new Date(position.deadline).toLocaleDateString('en-GB'),
         Interviewdate:new Date(position.interview_date).toLocaleDateString('en-GB'),
         addDets:position.details,
         noOfPos:Number(position.vacancies)
     }]
     })
     this.setState({
      name:companyDetails[0].company.name,
      category:companyDetails[0].company.category,
      link:companyDetails[0].company.link,
       addFields:addPos
    })
    console.log(this.state)
   }
   toggleModalEdit=()=>{
    this.setState({
        modalIsOpen : !this.state.modalIsOpen,  
    });
  console.log(this.state)
  }
   
saveModalDetails=(company)=>{
  const companyMain={
    name:company.name,
    category:company.category,
    link:company.link
  }
  axios.put(`http://kanishkshah.pythonanywhere.com/company/${this.props.companyId}`,companyMain)
.then(res=>{
        console.log(res.data);
        company.id=res.data.id
 })
 .then(data=>
   {
     company.addFields.map(addField =>
      {
       const positionDetails={
         id:addField.id,
         title:addField.position,
         company:company.id,
         vacancies:Number(addField.noOfPos),
         interview_date:new Date(addField.Interviewdate).toISOString(),
         deadline:new Date(addField.deadline).toISOString(),
         package:addField.packages,
         details:addField.addDets,
       }
       console.log(positionDetails)
       if(addField.id != undefined){
       axios.put(`http://kanishkshah.pythonanywhere.com/positions/${addField.id}`,positionDetails)
       .then(res=>{
        console.log(res.data);
      })
      }
      else {
        const newPositionDetails={
          title:addField.position,
          company:company.id,
          vacancies:Number(addField.noOfPos),
          interview_date:new Date(addField.Interviewdate).toISOString(),
          deadline:new Date(addField.deadline).toISOString(),
          package:addField.packages,
          details:addField.addDets,
        }
        axios.post(`http://kanishkshah.pythonanywhere.com/positions/`,newPositionDetails)
        .then(res=>{
         console.log(res.data);
       })
      }

      
      } 
       )
   })
.catch(err => console.log(err)) 

  this.setState({
     addFields:company.addFields,
     name:company.name,
     link:company.link,
     category:company.category,
     modalIsOpen: !company.modalIsOpen
  })
  console.log(this.state)
}

  render(){
    const company=this.state
      return(
        <div className="EditDetail">
         
          <div className="display_imdgrid">
          </div> 
      <h2 className="display_compName">{company.name}</h2>
          <div className="display_editProf" onClick={this.toggleModalEdit.bind(this)}>
          <FontAwesomeIcon icon={faPencilAlt} />
            <p className="center display_fontEdit">Edit Details</p>
          </div>
        <div className="display_editGreen">
        <div className="display_bgw">
        <div className="grid-item"><form>
      <h4 className="display_dets"><span style={{fontWeight:700}}>Category :</span> {company.category}</h4>
      <br/>
    <div className="display_edit" >
    {
          this.state.addFields.map((field,index)=>{
          
            return(
              <div key={index}>
                 
    <div className="display_editGrid">
    <h4 className="display_dets"><span style={{fontWeight:700}}>Position :</span> {field.position}</h4> 
    <h4 className="display_dets"><span style={{fontWeight:700}}>Number Of Position :</span> {field.noOfPos}</h4>
    <h4 className="display_dets"><span style={{fontWeight:700}}>Interview Date :</span> {field.Interviewdate}</h4>
    <h4 className="display_dets"><span style={{fontWeight:700}}>Deadline :</span> {field.deadline}</h4>
    <h4 className="display_dets"><span style={{fontWeight:700}}>Package:</span> {field.packages}</h4>
</div>
<h4 className="display_dets"><span style={{fontWeight:700}}>Add Details :</span> {field.addDets}</h4>  
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
export default EditDetail;  



 
 
        
  
