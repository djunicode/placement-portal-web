import React from 'react';

const Companies = ({ companies, showCompanies, handleShowMoreCompanies }) => {
  const list = companies.slice(0, showCompanies).map(company => {
    return (
      <div className="collection-item" key={company.id}>
        <div className="gridComp">
          <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="listpic" />
        </div>
        <div className="gridComp">
          <p>Name : {company.name}</p>
          <p>Position : {company.pos}</p>
        </div>
      </div>
    )
  })
  return (
    <div className="bgw1">
      <div className="grid-item">
        <h4>COMPANIES</h4>
        <div className="list">
          {list}
        </div>
        <div className="show">
          <button className="button_display" onClick={handleShowMoreCompanies}><i className="fa fa-chevron-down"></i></button>
        </div>
      </div>
    </div>
  )
}

export default Companies;
