import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Department from '../components/Department';
import Students from '../components/Students';
import '../css_styling/Tpo2.css';

class App extends Component{
  constructor(props){
    super(props)
    this.handleShowMore=this.handleShowMore.bind(this)
    this.state = {
    students: [
      {id: 1, name: 'ABC',branch:'comps',contact:'123456789'},
      {id: 2, name: 'efg',branch:'it',contact:'123456789'},
      {id: 3, name: 'lmn',branch:'comps',contact:'123456789'},
      {id: 4, name: 'Amazon',branch:'it',contact:'123456789'},
      {id: 5, name: 'pqr',branch:'comps',contact:'123456789'},
      {id: 6, name: 'xyz',branch:'it',contact:'123456789'},
    ],
    departments:[
      {id:1,name:'ABC'},{id:2,name:'XYZ'},{id:3,name:'LMN'}
    ],
    showItems:3
  }
}
  handleShowMore(){
    this.setState({
      showItems: 
        this.state.showItems >= this.state.students.length ?
          this.state.showItems : this.state.showItems + this.state.students.length -3
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
              <Department departments={this.state.departments} />
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
