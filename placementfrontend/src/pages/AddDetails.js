import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavR from '../components/AddDets_navbar';
import SidenavR from '../components/AddDets_Sidenav';
import Companies from '../components/AddComp_Companies';
import AddCompanies from '../components/AddCompanies';

import '../css_styling/addComp.css'


const AUTH_TOKEN='Token 43e81114f13b0e7a2384d95ed0116997babeff30'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

class AddDetails extends Component{
 
  state = {
    companies: [
//       {id: 1, name: 'Google',category:'super-dream',position:['computer-engineer'],noOfPos:['5'],date:['24/06/2020'],deadline:['24/05/2020'],package:['Rs.24,00,000'],link:'www.googleinfo.com',addDets:['The criteria as mentioned on the website needs to be fulfilled so as to apply for the interview']},
// {id: 2, name: 'Amazon',category:'super-dream',position:['computer-engineer'],noOfPos:['5'],date:['24/06/2020'],deadline:['24/05/2020'],package:['Rs.24,00,000'],link:'www.googleinfo.com',addDets:['The criteria as mentioned on the website needs to be fulfilled so as to apply for the interview']}

    ],
    showItems:3
  }
 
  componentDidMount(){
    axios.get(`http://kanishkshah.pythonanywhere.com/company/`)
    .then(res=>{
        this.setState({
            companies:res.data
        })
    })
    .catch(err => console.log(err));
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
    // let companies = [...this.state.companies, company];
    // this.setState({
    //   companies:companies
    // });
    if(company.link.trim().substring(0,4) !== 'http'){
      company.link=`http://${company.link.trim()}`;
    }
    else company.link=company.link.trim();
    console.log(company.name,company.category,company.link)
    const companyDetails = {
      name : company.name,
      category : company.category,
      link : company.link
    }
axios.post('http://kanishkshah.pythonanywhere.com/company/',companyDetails)
.then(res=>{
        console.log(res.data);
        company.id=res.data.id
}).then(res=>
  {
    company.addFields.map(addField =>
     {
      const positionDetails={
        title:addField.position,
        company:company.id,
        vacancies:Number(addField.noOfPos),
        interview_date:new Date(addField.Interviewdate).toISOString(),
        deadline:new Date(addField.deadline).toISOString(),
        package:addField.packages,
        details:addField.addDets,
      }
      console.log(positionDetails)
      axios.post('http://kanishkshah.pythonanywhere.com/positions/',positionDetails)
      .then(res=>{
        console.log(res.data);
      }).catch(err => console.log(err)) 
     
     } 
      )
  })
  .then(
    res=>{
      this.props.history.push(`/company/${company.id}`); 
    }
  )
.catch(err => console.log(err))  
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


