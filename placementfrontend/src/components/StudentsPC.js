import React from 'react'
const Students = ({students,showItems,handleShowMore}) => {
  const list = students.slice(0,showItems).map(student => {
      return (
        <div className="collection-item" key={student.id}>
          <div className="gridComp">
            <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="listpic"/>
          </div>
          <div className="gridComp">
          <p>Name : {student.name}</p>
          </div>
        </div>
      )})
  return (
    <div className="bgw1">
      <div className="grid-item">
        <h4>STUDENTS</h4>
        <div className="list">
        {list}
        </div>
        <div className="show">
        <button className="button_display" onClick={handleShowMore}><i className="fa fa-chevron-down"></i></button>
        </div>
      </div>
    </div>
  )
}

export default Students;