import React from 'react';

const Department = ({departments}) => {
  const list = departments.map(department => {
      return (
        <div className="Tpo2_collection-item" key={department.id}>
          <div className="Tpo2_gridComp">
            <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="Tpo2_listpic"/>
          </div>
          <div className="Tpo2_gridComp">
          <p>Name : {department.name}</p>
          </div>
        </div>
      )})
  return (
    <div className="Tpo2_bgw1">
      <div className="grid-item">
        <h4>DEPARTMENTS</h4>
        <div className="Tpo2_list">
        {list}
        </div>
      </div>
    </div>
  )
}

export default Department;
