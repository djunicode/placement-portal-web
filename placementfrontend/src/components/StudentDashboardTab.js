import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const studentDetails=[
    {
        student_name: 'David de Gea',
        student_sap: '6000418',
        student_department: 'Computer',
        student_pointer: '9.05',
        student_experience: '2 Years',
        student_profile_picture: 'https://i.dailymail.co.uk/1s/2019/09/13/22/18459506-0-image-a-44_1568410040843.jpg'
    }
]

class StudentTab extends Component {

    constructor() {
        super()
        this.state={
            studentDetails: studentDetails
        }
    }
    render() {
        return(
            <div id="main_studentdashboard">
                {
                    studentDetails.map(p => { 
                        return(
                            <div id="content_studentdashboard">
                                <img className="student_profile_picture_studentdashboard" src={p.student_profile_picture}></img>
                                <h4 className="data_studentdashboard">{p.student_name}</h4>
                                <h4 className="data_studentdashboard">{p.student_sap}</h4>
                                <h4 className="data_studentdashboard">{p.student_department}</h4>
                                <h4 className="data_studentdashboard">{p.student_pointer}</h4>
                                <h4 className="data_studentdashboard">{p.student_experience}</h4> <br></br>
                               <Link to ='/Studentprofile'> <button className="student_button_studentdashboard btn btn-lg"><img src="https://image.flaticon.com/icons/svg/61/61456.svg" id="edit_icon_studentdashboard"></img>EDIT PROFILE</button></Link> <br></br><br></br>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default StudentTab;