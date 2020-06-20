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
  }
}
componentDidMount(){
  axios.get(`http://kanishkshah.pythonanywhere.com/company/`,{
    headers: {
      'Authorization':'Token '+'e49cfa6db88f04cd99020b64ff8f56023dc9869b'}})
  .then(res => {
    const companies = res.data
    console.log(res.data);
    this.setState({companies : companies})
    console.log(this.state);
  }) 
  axios.get(`http://kanishkshah.pythonanywhere.com/students/`,{
    headers: {
      'Authorization':'Token '+'e49cfa6db88f04cd99020b64ff8f56023dc9869b'}})
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
        <Sidenav />
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
