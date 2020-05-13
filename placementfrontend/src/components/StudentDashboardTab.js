import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div id="main">
                {
                    studentDetails.map(p => { 
                        return(
                            <div id="content">
                                <img className="student_profile_picture" src={p.student_profile_picture}></img>
                                <h4>{p.student_name}</h4>
                                <h4>{p.student_sap}</h4>
                                <h4>{p.student_department}</h4>
                                <h4>{p.student_pointer}</h4>
                                <h4>{p.student_experience}</h4> <br></br>
                                <button className="student_button btn btn-lg"><img src="https://image.flaticon.com/icons/svg/61/61456.svg" id="edit_icon"></img>EDIT PROFILE</button> <br></br><br></br>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default StudentTab;