import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavR from '../components/AddDets_navbar';
import SidenavR from '../components/AddDets_Sidenav';
import Companies from '../components/AddComp_Companies';
import AddCompanies from '../components/AddCompanies';
import '../css_styling/addComp.css'

class AddDetails extends Component{
 
  state = {
    companies: [
      {id: 1, name: 'Google',category:'super-dream',position:['computer-engineer'],noOfPos:['5'],date:['24/06/2020'],deadline:['24/05/2020'],package:['Rs.24,00,000'],link:'www.googleinfo.com',addDets:['The criteria as mentioned on the website needs to be fulfilled so as to apply for the interview']},
{id: 2, name: 'Amazon',category:'super-dream',position:['computer-engineer'],noOfPos:['5'],date:['24/06/2020'],deadline:['24/05/2020'],package:['Rs.24,00,000'],link:'www.googleinfo.com',addDets:['The criteria as mentioned on the website needs to be fulfilled so as to apply for the interview']}

    ],
    showItems:3
    
  }
 
 showMore=()=>
 {
   this.setState({
     showItems:
     this.state.showItems >=this.state.companies.length?
     this.state.showItems:this.state.showItems + this.state.companies.length - 3
   })
 }
  addCompanies = (company) => {
    company.id = Math.random();
    let companies = [...this.state.companies, company];
    this.setState({
      companies:companies
    });
  }
  
  render(){
    return(<div className="Main">
      <div className="header"></div>
      <div className="addComp_grid-main">
        <div className="SidenavR_grid-1">
          <SidenavR/>
        </div>
        <div className="grid-2">
          <NavR/>
          <div className="row">
            <div className="addComp_hello col-12 col-lg-6 left" >
          <Companies companies={this.state.companies} showMore={this.showMore} showItems={this.state.showItems} /></div>  
          <div className="addComp_hello col-12 col-lg-6 right" >
        <AddCompanies addCompanies={this.addCompanies} /></div> 
          </div> 
          </div>
        </div>
     
      

    </div>);
    
  }
}
export default AddDetails;