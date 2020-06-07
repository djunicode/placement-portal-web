import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../css_styling/addComp.css';
import Empty from '../assets/empty.jpg';

const Companies = ({companies, showMore,showItems}) => {
  const companyList = companies.length ? (
    companies.slice(0,showItems).map(company => {
      return (
       
        <div className="addComp_collection-item" key={company.id}>
          <div className="addComp_gridComp">
            <img src={Empty} alt="default"/>
          </div>
          <div className="addComp_gridComp">
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
    <div className="addComp_bgw1">
      <div className="grid-item">
        <h4 style={{fontWeight:600}}>COMPANIES</h4>
        <div className="addComp_list">
        {companyList}
        <div className="addComp_more addComp_center">
        <button className="addComp_downIcon" onClick={ showMore} > <FontAwesomeIcon icon={faChevronDown} /></button></div>
        </div>
      
      </div>
    
    </div>
  )
}

export default Companies;
