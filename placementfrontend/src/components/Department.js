import React from 'react';

const Department = ({departments}) => {
  const list = departments.map(department => {
      return (
        <div className="collection-item" key={department.id}>
          <div className="gridComp">
            <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="listpic"/>
          </div>
          <div className="gridComp">
          <p>Name : {department.name}</p>
          </div>
        </div>
      )})
  return (
    <div className="bgw1">
      <div className="grid-item">
        <h4>DEPARTMENTS</h4>
        <div className="list">
        {list}
        </div>
      </div>
    </div>
  )
}

export default Department;
