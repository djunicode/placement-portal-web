import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/addComp.css'

const Companies = ({companies, showMore,showItems}) => {
  const companyList = companies.length ? (
    companies.slice(0,showItems).map(company => {
      return (
       
        <div className="collection-item" key={company.id}>
          <div className="gridComp">
            <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"/>
          </div>
          <div className="gridComp">
          <p>Name : {company.name}</p>
          <p>Category : {company.category}</p>
          <p>Link : {company.link}</p>
          </div>
          
          {/* <span onClick={() => {deleteCompany(company.id)}}>{company.content}</span> */}
        </div>
      )
    })
  ) : (
    <p className="center">No companies to show</p>
  );

  return (
    <div className="bgw1">
      <div className="grid-item">
        <h4>COMPANIES</h4>
        <div className="list">
        {companyList}
        <div className="more center">
        <button className="downIcon" onClick={ showMore} > <FontAwesomeIcon icon={faChevronDown} /></button></div>
        </div>
      
      </div>
    
    </div>
  )
}

export default Companies;
