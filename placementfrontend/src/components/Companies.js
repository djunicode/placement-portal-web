import React from 'react';

const Companies = ({ companies, showCompanies, handleShowMoreCompanies }) => {
  const list = companies.slice(0, showCompanies).map(company => {
    return (
      <div className="Tpo2_collection-item" key={company.id}>
        <div className="Tpo2_gridComp">
          <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="Tpo2_listpic" />
        </div>
        <div className="Tpo2_gridComp">
          <p>Name : {company.name}</p>
          <p>Position : {company.pos}</p>
        </div>
      </div>
    )
  })
  return (
    <div className="Tpo2_bgw1">
      <div className="grid-item">
        <h4>COMPANIES</h4>
        <div className="Tpo2_list">
          {list}
        </div>
        <div className="Tpo2_show">
          <button className="Tpo2_button_display" onClick={handleShowMoreCompanies}><i className="fa fa-chevron-down"></i></button>
        </div>
      </div>
    </div>
  )
}

export default Companies;
