import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/navbar';
import Sidenav from '../components/Sidenav';
import Department from '../components/Department';
import Students from '../components/Students';
import '../css_styling/Tpo2.css';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props)
    this.handleShowMore=this.handleShowMore.bind(this)
    this.selectDepartment=this.selectDepartment.bind(this)
    this.state = {
    students: [],
    departments:[
      {id:1,name:'COMPS'},{id:2,name:'IT'},{id:3,name:'EXTC'},{id:4,name:'ELEX'},{id:5,name:'MECH'},{id:6,name:'PROD'},{id:7,name:'BIO'},{id:8,name:'CHEM'}
    ],
    select:'COMPS',
    showItems:3,
  }
}
componentDidMount(){
  axios.get(`http://kanishkshah.pythonanywhere.com/students/`,{
    headers: {
      'Authorization':'Token '+'e49cfa6db88f04cd99020b64ff8f56023dc9869b'}})
  .then(res => {
    const students = res.data
    console.log(res.data);
    this.setState({students})
  }) 
}

  handleShowMore=(e)=>{
    this.setState({
      showItems: 
        this.state.showItems >= this.state.students.length ?
          this.state.showItems : this.state.showItems + this.state.students.length -3 
    })
  }
  selectDepartment=(department)=>{
    this.setState({
      select : department.name ,
      showItems : 3
    })
  }
 
  render(){
    return(
    <div className="App">    
       <div className="row">
        <header className="Tpo2_rectangle2"></header>
       </div>
      < div className="container-fluid">
      <div className="row d-flex py-5">
        <Sidenav />
      <div className="col-lg-10">
        <div className="row py-4 ">
          <Nav /> 
        </div>
        <div className="row ">
          <div className="col-12  Tpo2_box2 ">
            <div className="row d-flex">
            <div className=" col-10 col-lg-5  ml-5 my-5 mr-4   Tpo2_inner_box2 ">
              <Department departments={this.state.departments} select={this.state.select} selectDepartment={this.selectDepartment} />
            </div>
            <div className=" col-10 col-lg-5 m-5  Tpo2_inner_box2 ">
            < Students students={this.state.students}  showItems={this.state.showItems} select={this.state.select} handleShowMore={this.handleShowMore} />
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
}

export default App;
