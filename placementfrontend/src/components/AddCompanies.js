import React, { Component } from 'react';
import '../css_styling/addComp.css'
class AddCompanies extends Component {
    state = {
      name: null,
      category:null,
      position:null,
      noOfPos:null,
      date:null,
      deadline:null,
      package:null,
      link:null,
      addDets:null,
    }
 
  // state = {
  //   // name: '',category:'',position:'',
  //   formValues:{}
  // }
 
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
 
  }
handleAddMore=(e)=>
{
  e.preventDefault();
  var text= document.getElementById('wrapper').innerHTML
document.getElementById('wrapper').innerHTML += text; 
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
        <h4 class="leftalign">ADD COMPANY</h4>
       <div className="grid-item"><form onSubmit={this.handleSubmit}>
         <div className="addCompGrid">
          <input type="text"  placeholder="Name:"   onChange={this.handleChange} name="name"  required/>
          <select className="form-control" id="exampleFormControlSelect1"placeholder="Category:" onChange={this.handleChange} name="category"  required>
            <option disabled selected hidden>Category:</option>
      <option>Super-Dream</option>
      <option>Dream</option>
      <option>Regular</option>
    </select></div>
    <div class="addMore" id="wrapper">
    <div class="addMoreGrid">
          <input type="text" className="addInput"placeholder="Position:"  onChange={this.handleChange} name="position" required/>
 <input type="number" className="addInput"placeholder="Number Of Position:" onChange={this.handleChange} name="noOfPos" required min="0" />
         <input type="text"className="addInput"placeholder="Interview Date:" onFocus = {this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} name="date" required />
         <input type="text"className="addInput"placeholder="Deadline:" onFocus = {this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} name="deadline"  required />
<input type="text"className="addInput" placeholder="Package:" onChange={this.handleChange} name="package"  required/>
</div>
<input type="text" className="addInput"placeholder="Add Details" onChange={this.handleChange} name="addDets" required /> 
<button className="addMoreBtn" onClick={this.handleAddMore}><span class="center" style={{marginBottom:'5px'}}>+</span></button> 

</div> 
<input type="text"className="addInput" placeholder="Link:" onChange={this.handleChange} name="link"  required/> 
        <button className="submit ">ADD</button>
        </form></div>
       
      </div>

    )
  }
}

export default AddCompanies;