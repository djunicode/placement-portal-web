import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/NavbarPC';
import Sidenav from '../components/Sidenav';
import Companies from '../components/Companies';
import Students from '../components/StudentsPC';
import '../css_styling/Tpo2.css';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props)
    this.handleShowMore=this.handleShowMore.bind(this)
    this.handleShowMoreCompanies=this.handleShowMoreCompanies.bind(this)
    this.state = {
    students:[],
    companies:[],
    showItems:3,
    showCompanies:3,
    coordinatorId: this.props.match.params.coordinatorId,
    coordinator:[]
  }
}
componentDidMount(){
  axios.get(`http://kanishkshah.pythonanywhere.com/coordinator/${this.state.coordinatorId}`,{
    headers: {
      'Authorization':'Token '+'0b16cad5286c7e673c4f6a7c12516ef480e5be33'}})
  .then(res => {
    const coordinator = res.data
    console.log(res.data);
    this.setState({
     coordinator :coordinator,
     })
    console.log(this.state);
  }) 

  axios.get(`http://kanishkshah.pythonanywhere.com/company/`,{
    headers: {
      'Authorization':'Token '+'9ee4446ecca070c8f8d31462cb519bace58fdb33'}})
  .then(res => {
    const companies = res.data
    console.log(res.data);
    this.setState({companies : companies})
    console.log(this.state);
  }) 
  axios.get(`http://kanishkshah.pythonanywhere.com/students/`,{
    headers: {
      'Authorization':'Token '+'9ee4446ecca070c8f8d31462cb519bace58fdb33'}})
      .then(res => {
        const students = res.data
        console.log(res.data);
        this.setState({students:students})
        console.log(this.state);
      }) 
}

  handleShowMore(){
    this.setState({
      showItems: 
        this.state.showItems >= this.state.students.length ?
          this.state.showItems : this.state.showItems + this.state.students.length -3,
    })
  }
  handleShowMoreCompanies(){
    this.setState({
      showCompanies:
      this.state.showCompanies >= this.state.companies.length ?
          this.state.showCompanies : this.state.showCompanies + this.state.companies.length -3,
    })
  }

 
  render(){
    return(
    <div className="App_Dashboard">    
       <div className="row">
        <header className="Tpo2_rectangle2"></header>
       </div>
      < div className="container-fluid">
      <div className="row d-flex py-5">
        <Sidenav coordinator={this.state.coordinator} />
      <div className="col-lg-10">
        <div className="row py-4 ">
          <Nav /> 
        </div>
        <div className="row ">
          <div className="col-12  Tpo2_box2 ">
            <div className="row d-flex">
            <div className=" col-10 col-lg-5  ml-5 my-5 mr-4   Tpo2_inner_box2 ">
              <Companies companies={this.state.companies} showCompanies={this.state.showCompanies} handleShowMoreCompanies={this.handleShowMoreCompanies} />
            </div>
            <div className=" col-10 col-lg-5 m-5  Tpo2_inner_box2 ">
            < Students students={this.state.students}  showItems={this.state.showItems} handleShowMore={this.handleShowMore} />
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
