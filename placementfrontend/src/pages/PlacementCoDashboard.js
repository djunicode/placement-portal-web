import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/NavbarPC';
import Sidenav from '../components/Sidenav';
import Companies from '../components/Companies';
import Students from '../components/StudentsPC';
import '../css_styling/Tpo2.css';

class App extends Component{
  constructor(props){
    super(props)
    this.handleShowMore=this.handleShowMore.bind(this)
    this.handleShowMoreCompanies=this.handleShowMoreCompanies.bind(this)
    this.state = {
    students: [
      {id: 1, name: 'ABC',branch:'comps',contact:'123456789'},
      {id: 2, name: 'efg',branch:'it',contact:'123456789'},
      {id: 3, name: 'lmn',branch:'comps',contact:'123456789'},
      {id: 4, name: 'Amazon',branch:'it',contact:'123456789'},
      {id: 5, name: 'pqr',branch:'comps',contact:'123456789'},
      {id: 6, name: 'xyz',branch:'it',contact:'123456789'},
    ],
    companies:[
      {id:1,name:'ABC',pos:'Tech'},
      {id:2,name:'XYZ',pos:'Tech'},
      {id:3,name:'LMN',pos:'Tech'},
      {id:4,name:'ABC',pos:'Tech'},
      {id:5,name:'XYZ',pos:'Tech'},
      {id:6,name:'LMN',pos:'Tech'},
    ],
    showItems:3,
    showCompanies:3,

  }
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
    <div className="App">    
       <div className="row">
        <header className="rectangle2"></header>
       </div>
      < div className="container-fluid">
      <div className="row d-flex py-5">
        <Sidenav />
      <div className="col-lg-10">
        <div className="row py-4 ">
          <Nav /> 
        </div>
        <div className="row ">
          <div className="col-12  box2 ">
            <div className="row d-flex">
            <div className=" col-10 col-lg-5  ml-5 my-5 mr-4   inner_box2 ">
              <Companies companies={this.state.companies} showCompanies={this.state.showCompanies} handleShowMoreCompanies={this.handleShowMoreCompanies} />
            </div>
            <div className=" col-10 col-lg-5 m-5  inner_box2 ">
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
