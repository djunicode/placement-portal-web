import React, { Component } from 'react';
import '../css_styling/addComp.css'
class AddCompanies extends Component {
    state = {
      name: null,
      category:null,
      link:null,
      addFields:[{
        position:"",
        noOfPos:"",
        Interviewdate:"",
        deadline:"",
        package:"",
        addDets:""}
      ]
      
    }
 
  // state = {
  //   // name: '',category:'',position:'',
  //   formValues:{}
  // }
 
  handleChange = (e) => {
    if(["position","noOfPos","Interviewdate","deadline","package","addDets"].includes(e.target.name)){
      let addFields = [...this.state.addFields]
      addFields[e.target.name] = e.target.value;
      this.setState({
        addFields:addFields
      })
    }
    else{
      this.setState({
        [e.target.name] : e.target.value
      });
    }
   
    console.log(this.state)
  }
  // handleChange2(e,index)
  // {
  //   this.setState({
  //     [e.target.name[index]] : e.target.value
  //   });
  //   // this.state.addFields[index]=e.target.value
  //   // this.setState(
  //   //   {
  //   //     addFields: this.state.addFields
  //   //   }
      
  //   // )
  //   console.log(this.state)
  // }
handleAddMore=(e)=>
{
  {
    this.setState((prevState) =>({addFields:[...prevState.addFields,{
      position:"",
      noOfPos:"",
      Interviewdate:"",
      deadline:"",
      package:"",
      addDets:""}]}));
  }
//   e.preventDefault();
//   var text= document.getElementById('wrapper').innerHTML
// document.getElementById('wrapper').innerHTML += text; 
}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCompanies(this.state);
    console.log(this.state)
  }
  onFocus= (e)=>{
    e.currentTarget.type = "date";
}
onBlur=(e)=>{
    e.currentTarget.type = "text";
    
}
  render() {
    return (
      <div className="bgwAdd">
        <h4 className="leftalign">ADD COMPANY</h4>
       <div className="grid-item"><form onSubmit={this.handleSubmit}>
         <div className="addCompGrid">
          <input type="text"  placeholder="Name:"   onChange={this.handleChange} name="name"  required/>
          <select className="form-control" id="exampleFormControlSelect1"placeholder="Category:" onChange={this.handleChange} name="category"  required>
            <option disabled selected hidden>Category:</option>
      <option>Super-Dream</option>
      <option>Dream</option>
      <option>Regular</option>
    </select></div>
    <div className="addMore" >
    {
          this.state.addFields.map((field,index)=>{
          
            return(
              
              <div key={index}>
                 
    <div className="addMoreGrid">
          <input type="text" className="addInput"placeholder="Position:"  onChange={this.handleChange}  name="position" required/>
 <input type="number" className="addInput"placeholder="Number Of Position:"  onChange={this.handleChange} name="noOfPos" required min="0" />
         <input type="text"className="addInput"placeholder="Interview Date:" onFocus = {this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} name="Interviewdate" required />
         <input type="text"className="addInput"placeholder="Deadline:" onFocus = {this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} name="deadline"  required />
<input type="text"className="addInput" placeholder="Package:" onChange={this.handleChange} name="package"  required/>
</div>
<input type="text" className="addInput"placeholder="Add Details" onChange={this.handleChange} name="addDets" required />  


</div> 

                
             
            )

          })
        }
  
<button className="addMoreBtn" onClick={this.handleAddMore}><span className="center" style={{marginBottom:'5px'}}>+</span></button>  </div>
<input type="text"className="addInput" placeholder="Link:" onChange={this.handleChange} name="link"  required/> 
        <button className="submit ">ADD</button>
     
       </form>
       </div>

      </div>

    )
  }
}

export default AddCompanies;