import React from 'react'
const Students = ({students,showItems,handleShowMore}) => {
  const list = students.slice(0,showItems).map(student => {
      return (
        <div className="Tpo2_collection-item" key={student.id}>
          <div className="Tpo2_gridComp">
            <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="Tpo2_listpic"/>
          </div>
          <div className="Tpo2_gridComp">
          <p>Name : {student.name}</p>
          </div>
        </div>
      )})
  return (
    <div className="Tpo2_bgw1">
      <div className="grid-item">
        <h4>STUDENTS</h4>
        <div className="Tpo2_list">
        {list}
        </div>
        <div className="Tpo2_show">
        <button className="Tpo2_button_display" onClick={handleShowMore}><i className="fa fa-chevron-down"></i></button>
        </div>
      </div>
    </div>
  )
}

export default Students;